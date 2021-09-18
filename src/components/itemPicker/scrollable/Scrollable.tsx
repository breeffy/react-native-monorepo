import React, { forwardRef, useImperativeHandle } from 'react';
import Animated, {
  useAnimatedReaction,
  useDerivedValue
} from 'react-native-reanimated';
import { useCallbackOne, useMemoOne } from 'use-memo-one';
import { getValueProgress, interpolateWithRound } from '../../../worklets';
import { View, ViewStyle } from 'react-native';
import { usePaddingLayout } from '../../../hooks/usePaddingLayout';
import { ScrollableView } from './ScrollableView';
import {
  ScrollableFlatList,
  ScrollableFlatListProps
} from './ScrollableFlatList';
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
    indexInterpolateConfig,
    itemsLength,
    theme,
    keyExtractor,
    renderItem: _renderItem
  }: Required<ScrollableProps<T, U>>,
  ref: any
) => {
  const pagination = usePagination({
    scrollMode,
    itemsLength,
    itemSize,
    separatorSize
  });
  console.log(
    `pagination: ${JSON.stringify(
      pagination
    )}, scrollMode: ${scrollMode}, itemSize: ${itemSize}, separatorSize: ${separatorSize}`
  );
  const containerLayout = useMemoOne(() => {
    return {
      width: pickerWidth,
      height: pickerHeight,
      backgroundColor: theme.sheet.backgroundColor
    };
  }, [pickerWidth, pickerHeight, theme.sheet]);

  console.log(
    `mode: ${mode}, containerWidth: ${pickerWidth}, containerHeight: ${pickerHeight}, itemWidth: ${itemWidth}, itemHeight: ${itemHeight}`
  );

  const headerLayout = usePaddingLayout({
    mode,
    containerWidth: pickerWidth,
    containerHeight: pickerHeight,
    itemWidth,
    itemHeight
  });

  console.log(`paddingLayout: ${JSON.stringify(headerLayout)}`);

  const {
    scrollRef,
    scrollHandler,
    scrollContentOffset,
    scrollState
  } = useScroll();

  const offset = useDerivedValue(() => {
    return mode === 'horizontal'
      ? scrollContentOffset.value.x
      : scrollContentOffset.value.y;
  }, [mode]);

  useAnimatedReaction(
    () => {
      const index = interpolateWithRound(
        offset.value,
        indexInterpolateConfig,
        precision
      );
      const progress = getValueProgress(index, indexInterpolateConfig);
      const state = scrollState.value;
      console.log(`offset: ${offset.value}, index: ${index}`);
      return [index, progress, state] as const;
    },
    (array) => {
      currentIndex.value = array[0];
      currentProgress.value = array[1];
      currentScrollState.value = array[2];
    },
    [precision]
  );

  useImperativeHandle(ref, () => scrollRef);

  const renderItem = useCallbackOne<(item: T, index: number) => JSX.Element>(
    (item, index) => {
      // console.log(`item is ${JSON.stringify(item)}`);
      const props: PickerItemProps<T> = {
        item: item,
        itemIndex: index,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemSize: itemSize,
        itemsLength: itemsLength,
        currentIndex: currentIndex,
        currentProgress: currentProgress,
        pickerWidth: pickerWidth,
        pickerHeight: pickerHeight,
        pickerSize: pickerSize
      };

      const key = keyExtractor(item, index);
      return (
        <View
          key={key}
          style={{
            width: props.itemWidth,
            height: props.itemHeight,
            zIndex: -1 * props.itemIndex,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center'
            // backgroundColor: 'orange'
            // borderWidth: 2,
            // borderColor: 'green'
          }}
        >
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
      pickerWidth,
      pickerHeight,
      pickerSize
    ]
  );

  const getItemLayout = useCallbackOne(
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

  const horizontal = useMemoOne(() => {
    return mode === 'horizontal';
  }, [mode]);

  console.log(`containerWidth: ${pickerWidth}, itemWidth: ${itemWidth}`);
  console.log(`paddingLayout: ${JSON.stringify(headerLayout)}`);

  const contentOffset = useMemoOne(() => {
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

  const separatorStyle = useMemoOne(() => {
    const separatorColor = theme.separator.color;
    const separatorStyle: ViewStyle =
      mode === 'horizontal'
        ? { width: separatorSize, height: itemHeight }
        : { width: itemWidth, height: separatorSize };
    return [separatorStyle, { backgroundColor: separatorColor }];
  }, [theme.separator.color, separatorSize, mode, itemHeight, itemWidth]);

  const SeparatorComponent = useCallbackOne(() => {
    /** Do not render separators in this case */
    if (separatorSize <= 0) return;

    return <View style={separatorStyle} />;
  }, [separatorSize, separatorStyle]);

  const commonProps = useMemoOne<ScrollableCommon<T>>(() => {
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
      itemSeparator: SeparatorComponent,
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
    renderItem,
    scrollHandler,
    SeparatorComponent
  ]);

  const ScrollableComponent = useMemoOne(() => {
    if (scrollComponentKind === 'flatlist') {
      const perf = performance as ItemPickerPerformance<'flatlist'>;
      const flatlistProps: ScrollableFlatListProps<T> = {
        ...commonProps,
        initialScrollIndex: initialIndex,
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
