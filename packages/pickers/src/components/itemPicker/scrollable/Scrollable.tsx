import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import Animated, {
  useAnimatedReaction,
  useDerivedValue
} from 'react-native-reanimated';
import { getValueProgress, interpolateWithRound } from '../../../worklets';
import { View } from 'react-native';
import { usePaddingLayout } from '../../../hooks/usePaddingLayout';
import { ScrollableView } from './ScrollableView';
import { ScrollableFlatList } from './ScrollableFlatList';
import { usePagination } from '../../../hooks/usePagination';
import { useScroll } from '../../../hooks/useScroll';
import type { ScrollableCommon } from './types';
import type { PickerItemProps } from '../../itemPicker/types';
import type {
  ItemPickerPerformance,
  ItemPickerProps,
  ItemPickerScrollComponentKind
} from '../../../pickers/ItemPicker';
import type { InterpolateConfig } from '../../../utils';
import { itemsDistance } from '../../../pickers/utils';
import { round } from 'react-native-redash';
import type { ViewStyle } from 'react-native';
import type { RequiredExcept } from '@breeffy/types';
import type { ScrollableFlatListProps } from './ScrollableFlatList';

interface ScrollableFlatList<T> extends ScrollableFlatListProps<T> {
  kind: 'flatlist';
}

export interface ScrollableProps<T, U extends ItemPickerScrollComponentKind>
  extends ItemPickerProps<T, U> {
  pickerWidth: number;
  pickerHeight: number;
  itemSize: number;
  currentIndex: Animated.SharedValue<number>;
  currentProgress: Animated.SharedValue<number>;
  itemsLength: number;
  indexInterpolateConfig: InterpolateConfig;
}

const ScrollableComponent = <T, U extends ItemPickerScrollComponentKind>(
  {
    items,
    initialIndex,
    mode,
    scrollMode,
    performance,
    scrollModeDeceleration,
    scrollComponentKind,
    precision,
    roundMode,
    pickerWidth,
    pickerHeight,
    pickerSize,
    separatorSize,
    itemWidth,
    itemHeight,
    itemSize,
    currentIndex,
    currentProgress,
    currentScrollState,
    currentRawIndex,
    indexInterpolateConfig,
    itemsLength,
    theme,
    keyExtractor,
    renderItem: _renderItem
  }: RequiredExcept<ScrollableProps<T, U>, 'roundMode'>,
  ref: any
) => {
  const pagination = usePagination({
    scrollMode,
    itemsLength,
    itemSize,
    separatorSize
  });
  // console.log(
  //   `pagination: ${JSON.stringify(
  //     pagination
  //   )}, scrollMode: ${scrollMode}, itemSize: ${itemSize}, separatorSize: ${separatorSize}`
  // );
  const containerLayout = useMemo(() => {
    return {
      width: pickerWidth,
      height: pickerHeight,
      backgroundColor: theme.sheet.backgroundColor
    };
  }, [pickerWidth, pickerHeight, theme.sheet]);

  // console.log(
  //   `mode: ${mode}, containerWidth: ${pickerWidth}, containerHeight: ${pickerHeight}, itemWidth: ${itemWidth}, itemHeight: ${itemHeight}`
  // );

  const headerLayout = usePaddingLayout({
    mode,
    containerWidth: pickerWidth,
    containerHeight: pickerHeight,
    itemWidth,
    itemHeight
  });

  const { scrollRef, scrollHandler, scrollContentOffset, scrollState } =
    useScroll();

  const offset = useDerivedValue(() => {
    return mode === 'horizontal'
      ? scrollContentOffset.value.x
      : scrollContentOffset.value.y;
  }, [mode]);

  useAnimatedReaction(
    () => {
      const rawIndex = interpolateWithRound(
        offset.value,
        indexInterpolateConfig,
        null
      );

      let index;
      if (roundMode === 'ceil') {
        index = Math.ceil(rawIndex);
      } else if (roundMode === 'floor') {
        index = Math.floor(rawIndex);
      } else {
        index = round(rawIndex, precision === null ? undefined : precision);
      }

      const progress = getValueProgress(index, indexInterpolateConfig);
      const state = scrollState.value;

      return [index, progress, state, rawIndex] as const;
    },
    array => {
      currentIndex.value = array[0];
      currentProgress.value = array[1];
      currentScrollState.value = array[2];
      currentRawIndex.value = array[3];
    },
    [precision, roundMode]
  );

  useImperativeHandle(ref, () => scrollRef);

  const renderItem = useCallback<(item: T, index: number) => JSX.Element>(
    (item, index) => {
      const props: PickerItemProps<T> = {
        item: item,
        itemIndex: index,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemSize: itemSize,
        itemsLength: itemsLength,
        currentIndex: currentIndex,
        currentProgress: currentProgress,
        currentRawIndex: currentRawIndex,
        pickerWidth: pickerWidth,
        pickerHeight: pickerHeight,
        pickerSize: pickerSize
      };

      const style: ViewStyle = {
        width: props.itemWidth,
        height: props.itemHeight,
        zIndex: -1 * props.itemIndex,
        justifyContent: 'center',
        alignItems: 'center'
      };

      const key = keyExtractor(item, index);
      return (
        <View key={key} style={style}>
          {_renderItem(props)}
        </View>
      );
    },
    [
      _renderItem,
      itemWidth,
      itemHeight,
      itemSize,
      itemsLength,
      currentIndex,
      currentProgress,
      currentRawIndex,
      pickerWidth,
      pickerHeight,
      pickerSize
    ]
  );

  const getItemLayout = useCallback(
    (_: T[] | null | undefined, index: number) => {
      const intervalSize = itemsDistance(itemSize, separatorSize);
      return {
        length: intervalSize,
        offset: intervalSize * index,
        index
      };
    },
    [itemSize, separatorSize]
  );

  const horizontal = useMemo(() => {
    return mode === 'horizontal';
  }, [mode]);

  // console.log(`containerWidth: ${pickerWidth}, itemWidth: ${itemWidth}`);
  // console.log(`paddingLayout: ${JSON.stringify(headerLayout)}`);

  const contentOffset = useMemo(() => {
    const intervalSize = itemsDistance(itemSize, separatorSize);
    const offset = initialIndex * intervalSize;
    if (mode === 'horizontal') {
      return {
        x: offset,
        y: 0
      };
    } else if (mode === 'vertical') {
      return {
        x: 0,
        y: offset
      };
    }
    return;
  }, [mode, initialIndex, itemSize, separatorSize, scrollComponentKind]);

  const separatorStyle = useMemo(() => {
    const separatorColor = theme.separator.color;
    const separatorStyle: ViewStyle =
      mode === 'horizontal'
        ? { width: separatorSize, height: itemHeight }
        : { width: itemWidth, height: separatorSize };
    return [separatorStyle, { backgroundColor: separatorColor }];
  }, [theme.separator.color, separatorSize, mode, itemHeight, itemWidth]);

  const SeparatorComponent = useCallback(() => {
    return <View style={separatorStyle} />;
  }, [separatorSize, separatorStyle]);

  const commonProps = useMemo<ScrollableCommon<T>>(() => {
    return {
      items: items,
      disableIntervalMomentum: pagination.disableIntervalMomentum,
      snapToOffsets: pagination.snapToOffsets,
      scrollEventThrottle: performance?.scrollEventThrottle,
      horizontal: horizontal,
      showsHorizontalScrollIndicator: false,
      decelerationRate: scrollModeDeceleration,
      contentOffset: contentOffset,
      headerComponentStyle: headerLayout,
      footerComponentStyle: headerLayout,
      itemSeparator: separatorSize > 0 ? SeparatorComponent : undefined,
      renderItem: renderItem,
      onScroll: scrollHandler
    };
  }, [
    items,
    pagination,
    performance,
    horizontal,
    scrollModeDeceleration,
    contentOffset,
    headerLayout,
    separatorSize,
    renderItem,
    scrollHandler,
    SeparatorComponent
  ]);

  const ScrollableComponent = useMemo(() => {
    if (scrollComponentKind === 'flatlist') {
      const perf = performance as ItemPickerPerformance<'flatlist'>;
      const flatlistProps: ScrollableFlatListProps<T> = {
        ...commonProps,
        initialNumToRender: perf.initialNumToRender,
        maxToRenderPerBatch: perf.maxToRenderPerBatch,
        windowSize: perf.windowSize,
        updateCellsBatchingPeriod: perf.updateCellsBatchingPeriod,
        keyExtractor: keyExtractor,
        getItemLayout: getItemLayout
      };
      return <ScrollableFlatList {...flatlistProps} />;
    } else {
      return <ScrollableView {...commonProps} />;
    }
  }, [commonProps, initialIndex, performance, SeparatorComponent]);

  return <View style={containerLayout}>{ScrollableComponent}</View>;
};

export const Scrollable = forwardRef(ScrollableComponent);
