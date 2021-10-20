import React, { forwardRef, useMemo } from 'react';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useSharedValue
} from 'react-native-reanimated';
import { getValueProgress } from '../worklets';
import { ScrollState, windowHeight, windowWidth } from '../constants';
import { getScrollableIndexInterpolateConfig } from '../utils';
import { useItemSize } from '../hooks/useItemSize';
import { Scrollable } from '../components/itemPicker/scrollable/Scrollable';
import { PickerThemeProvider } from '../contexts/pickerTheme';
import { PickerThemeLight } from '../themes';
import { invariant } from '@breeffy/invariants';
import type { PickerItemProps } from '../components/itemPicker/types';
import type { ScrollableCommon } from '../components/itemPicker/scrollable/types';
import type { ScrollableFlatListProps } from '../components/itemPicker/scrollable/ScrollableFlatList';
import type { ScrollableViewProps } from '../components/itemPicker/scrollable/ScrollableView';
import type { PickerTheme } from '../types/pickerTheme';

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
      | 'updateCellsBatchingPeriod'
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
   * Mode to round `currentIndex` to integer value.
   * _Only applicable_ when `precision` is set to `0` (round to integer values).
   * @defaultValue `round` if `precision` is `0`
   * @defaultValue `undefined` otherwise
   */
  roundMode?: 'ceil' | 'round' | 'floor';

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

  /**
   * Current raw animated index, **without** rounding.
   * Property `precision` is ignored. Use this property
   * to interpolate animations, for example in `renderItem()` function
   */
  currentRawIndex?: Animated.SharedValue<number>;

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
  props: ItemPickerProps<T, ItemPickerScrollComponentKind>,
  _ref: any
) => {
  const {
    items,
    currentProgress: _currentProgress,
    currentIndex: _currentIndex,
    currentScrollState: _currentScrollState,
    currentRawIndex: _currentRawIndex,
    initialIndex = 0,
    mode = 'horizontal',
    scrollMode = 'anyOffset',
    scrollModeDeceleration = 'normal',
    scrollComponentKind = 'flatlist',
    precision = 2,
    roundMode: _roundMode,
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
  } = props;

  const roundMode =
    _roundMode === undefined
      ? precision === 0
        ? 'round'
        : _roundMode
      : _roundMode;

  // Check compatibility of precision and roundMode properties
  invariant(
    (roundMode === undefined && precision !== 0) ||
      ((roundMode === 'ceil' ||
        roundMode === 'floor' ||
        roundMode === 'round') &&
        precision === 0),
    `precision [${precision}] and roundMode [${roundMode}] are incompatible`
  );

  const { pickerSize, pickerWidth, pickerHeight } = useMemo(() => {
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

  const performance = useMemo(() => {
    if (_performance === undefined) {
      // const intervalSize = itemsDistance(itemSize, separatorSize);
      // const maxVisibleItems = Math.floor(pickerSize / intervalSize) + 1;

      return {
        initialNumToRender: 0,
        maxToRenderPerBatch: 100,
        windowSize: 3,
        updateCellsBatchingPeriod: 5,
        scrollEventThrottle: 1
      } as ItemPickerPerformance<'flatlist'>;
    }
    return _performance;
  }, [_performance, pickerSize, itemSize, separatorSize, initialIndex]);

  const indexInterpolateConfig = useMemo(() => {
    const indexes = [...items.keys()];
    return getScrollableIndexInterpolateConfig(
      indexes,
      itemSize,
      separatorSize
    );
  }, [items, itemSize, separatorSize]);

  const currentIndex = useSharedValue(initialIndex);
  const currentRawIndex = useSharedValue(initialIndex);

  const initialProgress = useMemo(() => {
    return runOnJS(getValueProgress)(
      currentIndex.value,
      indexInterpolateConfig
    ) as unknown as number;
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
        currentScrollState.value,
        currentRawIndex.value
      ] as const;
    },
    array => {
      if (_currentIndex !== undefined) {
        _currentIndex.value = array[0];
      }

      if (_currentProgress !== undefined) {
        _currentProgress.value = array[1];
      }

      if (_currentScrollState !== undefined) {
        _currentScrollState.value = array[2];
      }

      if (_currentRawIndex !== undefined) {
        _currentRawIndex.value = array[3];
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
        roundMode={roundMode}
        performance={performance}
        indexInterpolateConfig={indexInterpolateConfig}
        currentIndex={currentIndex}
        currentProgress={currentProgress}
        currentScrollState={currentScrollState}
        currentRawIndex={currentRawIndex}
        theme={theme}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </PickerThemeProvider>
  );
};

export const ItemPicker = forwardRef(ItemPickerComponent);
