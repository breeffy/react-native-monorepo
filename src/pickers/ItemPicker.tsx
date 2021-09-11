import React, { forwardRef } from 'react';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useSharedValue
} from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { getValueProgress } from '../worklets';
import { ScrollState, windowHeight, windowWidth } from '../constants';
import { getScrollableIndexInterpolateConfig } from '../utils';
import { useItemSize } from '../hooks/useItemSize';
import { Scrollable } from '../components/itemPicker/scrollable/Scrollable';
import type { PickerItemProps } from '../components/itemPicker/types';
import type { ScrollableCommon } from '../components/itemPicker/scrollable/types';
import type { ScrollableFlatListProps } from '../components/itemPicker/scrollable/ScrollableFlatList';
import type { ScrollableViewProps } from '../components/itemPicker/scrollable/ScrollableView';
import type { PickerTheme } from '../types/pickerTheme';
import { PickerThemeProvider } from '../contexts/pickerTheme';
import { PickerThemeLight } from '../themes';

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type ItemPickerScrollComponentKind = 'scrollview' | 'flatlist';
export type ItemPickerPerformance<
  T extends ItemPickerScrollComponentKind,
  U = any
> = T extends 'scrollview'
  ? Pick<ScrollableViewProps<U>, 'scrollEventThrottle'>
  : Pick<
      ScrollableFlatListProps<U>,
      | 'scrollEventThrottle'
      | 'initialNumToRender'
      | 'maxToRenderPerBatch'
      | 'windowSize'
    >;

export interface ItemPickerProps<
  T,
  U extends ItemPickerScrollComponentKind = ItemPickerScrollComponentKind
> {
  /**
   * Items which will be shown in ItemPicker.
   */
  items: T[];

  /**
   * Initial index to be selected.
   * If not provided, `start` will be selected by default.
   */
  initialIndex?: number;

  /**
   * Show horizontal or vertical picker.
   * @defaultValue `horizontal`
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * How much values can be scrolled over.
   * @defaultValue `oneValue`
   */
  scrollMode?: 'oneItem' | 'multipleItems' | 'anyOffset';

  /**
   * How quickly scrolling decelerates after the user lifts their finger.
   * @defaultValue `normal`
   */
  scrollModeDeceleration?: ScrollableCommon<T>['decelerationRate'];

  /**
   * **Internal animated scroll component**.
   * @defaultValue `flatlist`
   */
  scrollComponentKind?: U;

  /**
   * Precision with which animated values `currentIndex`, `currentProgress` are rounded.
   * If `null` is provided no rounding is performed.
   * @defaultValue `2`
   */
  precision: number | null;

  /**
   * Properties to customize performance characteristics
   */
  performance?: ItemPickerPerformance<U>;

  /**
   * Current animated index
   */
  currentIndex?: Animated.SharedValue<number>;

  /**
   * Current animated scroll progress
   */
  currentProgress?: Animated.SharedValue<number>;

  /**
   * current scroll state
   */
  currentScrollState?: Animated.SharedValue<ScrollState>;

  itemWidth: number;
  itemHeight: number;

  /**
   * Size of the picker in pixels along the main dimension.
   *
   * For **horizontal** mode you can think of it as a **width**,
   * for **vertical** as a **height**.
   *
   * If not provided, width or height of the window will be used.
   * @defaultValue `windowWidth` | `windowHeight`
   */
  pickerSize?: number;

  /**
   * Size of the separator (gap) between items along the main dimension.
   * For **horizontal** mode it is additional width between items.
   * For **vertical** mode it is additional height between items.
   * @defaultValue `0`
   */
  separatorSize?: number;

  /**
   * Theme object to customize picker appearance
   */
  theme?: PickerTheme;

  renderItem: (props: PickerItemProps<T>) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
}

const ItemPickerComponent = <T,>(
  {
    items,
    currentProgress: _currentProgress,
    currentIndex: _currentIndex,
    currentScrollState: _currentScrollState,
    initialIndex = 0,
    mode = 'horizontal',
    scrollMode = 'anyOffset',
    scrollModeDeceleration = 'normal',
    scrollComponentKind = 'flatlist',
    precision = 2,
    performance: _performance,
    pickerSize: _pickerSize,
    separatorSize = 0,
    // itemWidth = PickerConstants.ValueWidth,
    itemWidth,
    // itemHeight = PickerConstants.ValueHeight,
    itemHeight,
    theme = PickerThemeLight,
    renderItem,
    keyExtractor
  }: ItemPickerProps<T, ItemPickerScrollComponentKind>,
  _ref: any
) => {
  const { pickerSize, pickerWidth, pickerHeight } = useMemoOne(() => {
    if (mode === 'horizontal') {
      const pickerSize = _pickerSize ?? windowWidth;
      return {
        pickerSize: pickerSize,
        pickerWidth: pickerSize,
        pickerHeight: itemHeight
      };
    } else {
      const pickerSize = _pickerSize ?? windowHeight;
      return {
        pickerSize: itemWidth,
        pickerWidth: pickerSize,
        pickerHeight: pickerSize
      };
    }
  }, [mode, _pickerSize, itemWidth, itemHeight]);

  const itemSize = useItemSize({
    mode,
    itemWidth: itemWidth,
    itemHeight: itemHeight
  });

  const performance = useMemoOne(() => {
    if (_performance === undefined) {
      const initialNumToRender = Math.floor(pickerSize / itemSize) + 2;
      return {
        initialNumToRender: initialNumToRender,
        maxToRenderPerBatch: 10,
        windowSize: 21,
        scrollEventThrottle: 1
      } as ItemPickerPerformance<'flatlist'>;
    }
    return _performance;
  }, [_performance, pickerSize, itemSize]);

  const indexInterpolateConfig = useMemoOne(() => {
    const indexes = [...items.keys()];
    return getScrollableIndexInterpolateConfig(
      indexes,
      itemSize,
      separatorSize
    );
  }, [items, itemSize, separatorSize]);

  const currentIndex = useSharedValue(initialIndex);

  const initialProgress = useMemoOne(() => {
    return (runOnJS(getValueProgress)(
      currentIndex.value,
      indexInterpolateConfig
    ) as unknown) as number;
  }, [indexInterpolateConfig]);

  const currentProgress = useSharedValue(initialProgress);
  const currentScrollState = useSharedValue<ScrollState>(
    ScrollState.UNDETERMINED
  );

  useAnimatedReaction(
    () => {
      return [
        currentIndex.value,
        currentProgress.value,
        currentScrollState.value
      ] as const;
    },
    (array) => {
      if (_currentIndex !== undefined) {
        _currentIndex.value = array[0];
      }

      if (_currentProgress !== undefined) {
        _currentProgress.value = array[1];
      }

      if (_currentScrollState !== undefined) {
        _currentScrollState.value = array[2];
      }
    },
    []
  );

  return (
    <PickerThemeProvider value={theme}>
      <Scrollable
        items={items}
        mode={mode}
        initialIndex={initialIndex}
        pickerWidth={pickerWidth}
        pickerHeight={pickerHeight}
        pickerSize={pickerSize}
        separatorSize={separatorSize}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        itemSize={itemSize}
        itemsLength={items.length}
        scrollMode={scrollMode}
        scrollModeDeceleration={scrollModeDeceleration}
        scrollComponentKind={scrollComponentKind}
        precision={precision}
        performance={performance}
        indexInterpolateConfig={indexInterpolateConfig}
        currentIndex={currentIndex}
        currentProgress={currentProgress}
        currentScrollState={currentScrollState}
        theme={theme}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </PickerThemeProvider>
  );
};

export const ItemPicker = forwardRef(ItemPickerComponent);
