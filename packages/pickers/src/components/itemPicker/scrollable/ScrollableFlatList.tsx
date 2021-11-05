import { forwardRef, useCallback } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import type { FlatListProps } from 'react-native';
import type { ScrollableCommon, ScrollableFlatListRef } from './types';

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Component = AnimatedFlatList;

export interface ScrollableFlatListProps<T> extends ScrollableCommon<T> {
  initialNumToRender: FlatListProps<T>['initialNumToRender'];
  maxToRenderPerBatch: FlatListProps<T>['maxToRenderPerBatch'];
  windowSize: FlatListProps<T>['windowSize'];
  updateCellsBatchingPeriod: FlatListProps<T>['updateCellsBatchingPeriod'];
  keyExtractor: FlatListProps<T>['keyExtractor'];
  getItemLayout: FlatListProps<T>['getItemLayout'];
}

const ScrollableFlatListComponent = <T,>(
  {
    items,
    initialNumToRender,
    maxToRenderPerBatch,
    windowSize,
    updateCellsBatchingPeriod,
    horizontal,
    disableIntervalMomentum,
    snapToOffsets,
    showsHorizontalScrollIndicator,
    scrollEventThrottle,
    decelerationRate,
    contentOffset,
    headerComponentStyle,
    footerComponentStyle,
    itemSeparator: ItemSeparatorComponent,
    keyExtractor,
    getItemLayout,
    renderItem: _renderItem,
    onScroll
  }: ScrollableFlatListProps<T>,
  ref: ScrollableFlatListRef
) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return _renderItem(item, index);
    },
    [_renderItem]
  );

  return (
    <Component
      // @ts-expect-error
      ref={ref}
      horizontal={horizontal}
      disableIntervalMomentum={disableIntervalMomentum}
      snapToOffsets={snapToOffsets}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      decelerationRate={decelerationRate}
      scrollEventThrottle={scrollEventThrottle}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={View}
      ListFooterComponent={View}
      ListHeaderComponentStyle={headerComponentStyle}
      ListFooterComponentStyle={footerComponentStyle}
      data={items}
      initialNumToRender={initialNumToRender}
      windowSize={windowSize}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
      contentOffset={contentOffset}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      onScroll={onScroll}
    />
  );
};

export const ScrollableFlatList = forwardRef(ScrollableFlatListComponent);
