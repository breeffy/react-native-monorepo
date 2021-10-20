import React, { forwardRef, useCallback, useLayoutEffect } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import type { ScrollableCommon, ScrollableViewRef } from './types';

export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export interface ScrollableViewProps<T> extends ScrollableCommon<T> {}

const ScrollableViewComponent = <T,>(
  {
    items,
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
    renderItem,
    onScroll
  }: ScrollableViewProps<T>,
  ref: ScrollableViewRef
) => {
  useLayoutEffect(() => {}, []);

  const ContentList: Function = useCallback(() => {
    if (ItemSeparatorComponent === undefined) {
      return items.map((item, index) => {
        return renderItem(item, index);
      });
    }

    return items.map((item, index) => {
      if (index >= 0 && index < items.length - 1) {
        return (
          <React.Fragment key={`__fragment-${index}`}>
            {renderItem(item, index)}
            <ItemSeparatorComponent />
          </React.Fragment>
        );
      }
      return renderItem(item, index);
    });
  }, [items, ItemSeparatorComponent]);

  return (
    <AnimatedScrollView
      ref={ref}
      horizontal={horizontal}
      disableIntervalMomentum={disableIntervalMomentum}
      snapToOffsets={snapToOffsets}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      decelerationRate={decelerationRate}
      scrollEventThrottle={scrollEventThrottle}
      contentOffset={contentOffset}
      overScrollMode='never'
      onScroll={onScroll}
    >
      <View style={headerComponentStyle} />
      <ContentList />
      <View style={footerComponentStyle} />
    </AnimatedScrollView>
  );
};

export const ScrollableView = forwardRef(ScrollableViewComponent);
