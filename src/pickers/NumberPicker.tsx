import React from 'react';
import Animated, {
  Extrapolate,
  useAnimatedReaction,
  useSharedValue
} from 'react-native-reanimated';
import {
  ItemPicker,
  ItemPickerProps,
  ItemPickerScrollComponentKind
} from './ItemPicker';
import { useItemSize } from '../hooks/useItemSize';
import { useCallbackOne, useMemoOne } from 'use-memo-one';
import { Accumulator, cardReducer } from './utils';
import { usePickerLayout } from '../hooks/usePickerLayout';
import { interpolateWithRound } from '../worklets';
import type { InterpolateConfig } from '../utils';
import type { PickerItemProps } from '../components/itemPicker/types';

export interface CardItemProps<T> extends PickerItemProps<T> {
  translates: number[];
  scales: number[];
  pickerBorderDistance: number;
}

export type NumberPickerProps<T> = Omit<
  ItemPickerProps<T, ItemPickerScrollComponentKind>,
  'renderItem'
> & {
  /**
   * Scales of items in order, starting from the first item.
   * You setup scales only for number of items you
   * about to interpolate.
   */
  itemScales?: number[];

  /**
   * Returns ledge (offset) of item from previous one.
   * 
   * Initially item is positioned so that right edge of item 
   * is the same as right edge of previous item.
   * 
   * So, if you want to layout item right next to adjacent one,
   * use this function: 
   * `(itemScale: number, itemSize: number) => itemScale * itemSize`

   * If you want to make item ledge from previous item by some 
   * constant offset use this function:
   * `(itemScale: number, itemSize: number) => 20`
   */
  getItemOffset?: (itemScale: number, itemSize: number) => number;
  renderItem: (props: CardItemProps<T>) => JSX.Element;
  currentValue: Animated.SharedValue<number>;
};

export const NumberPicker = <T extends number = number>(
  props: NumberPickerProps<T>
) => {
  const {
    items,
    mode = 'horizontal',
    pickerSize: _pickerSize,
    itemWidth,
    itemHeight,
    itemScales = [],
    scrollComponentKind = 'scrollview',
    renderItem: _renderItem,
    getItemOffset,
    initialIndex = 0,
    currentIndex: _currentIndex,
    currentProgress: _currentProgress,
    currentValue: _currentValue,
    currentScrollState: _currentScrollState
  } = props;

  const currentIndex = useSharedValue<number>(initialIndex);

  // const initialValue = useMemoOne(() => {
  //   return items[initialIndex];
  // }, [items, initialIndex]);

  const valueInterpolateConfig = useMemoOne(() => {
    const indexes = [...items.keys()];
    return ([
      indexes,
      items,
      Extrapolate.CLAMP
    ] as unknown) as InterpolateConfig;
  }, [items]);

  useAnimatedReaction(
    () => {
      // console.log(`offset: ${offset.value}`);

      /** Calculate value based on index value */
      const currentValue = interpolateWithRound(
        currentIndex.value,
        valueInterpolateConfig
      );

      return [currentIndex.value, currentValue] as const;
    },
    (array) => {
      if (_currentIndex !== undefined) {
        _currentIndex.value = array[0];
      }

      if (_currentValue !== undefined) {
        _currentValue.value = array[1];
      }
    },
    []
  );

  // const valueInterpolateConfig = useMemoOne(() => {
  //   return getPickerInterpolateConfig(values, cellSize);
  // }, [values, cellSize]);

  // useAnimatedReaction(
  //   () => {
  //     // const currentValue =
  //     return [currentValue.value, currentProgress.value, currentIndex.value];
  //   },
  //   (array) => {
  //     if (_currentValue !== undefined) {
  //       _currentValue.value = array[0];
  //     }
  //     // if (_currentProgress !== undefined) {
  //     //   _currentProgress.value = array[1];
  //     // }
  //     if (_currentIndex !== undefined) {
  //       _currentIndex.value = array[2];
  //     }
  //   },
  //   []
  // );

  const { pickerSize } = usePickerLayout({
    mode,
    pickerSize: _pickerSize,
    itemWidth,
    itemHeight
  });

  const itemSize = useItemSize({
    mode,
    itemWidth: itemWidth,
    itemHeight: itemHeight
  });

  const pickerBorderDistance = useMemoOne(() => {
    return Math.ceil(Math.abs((pickerSize - itemSize) / 2));
  }, [pickerSize, itemSize]);

  const [translates, scales] = useMemoOne(() => {
    const info = itemScales.map((it) => {
      return {
        scale: it,
        offset: getItemOffset(it, itemSize)
      };
    });

    const acc = info.reduce<Accumulator>(cardReducer, {
      itemSize: itemSize,
      currentOffset: 0,
      translates: []
    });
    return [acc.translates, itemScales];
  }, [itemSize, itemScales, getItemOffset]);

  const renderItem = useCallbackOne(
    (pickerItemProps: PickerItemProps<T>) => {
      const cardItemProps: CardItemProps<T> = {
        ...pickerItemProps,
        translates: translates,
        scales: scales,
        pickerBorderDistance
      };
      return _renderItem(cardItemProps);
    },
    [_renderItem, translates, scales, pickerBorderDistance]
  );

  return (
    <ItemPicker<T>
      {...props}
      mode={mode}
      pickerSize={pickerSize}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      currentIndex={currentIndex}
      scrollComponentKind={scrollComponentKind}
      renderItem={renderItem}
    />
  );
};
