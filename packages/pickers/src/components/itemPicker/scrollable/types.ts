import type { FlatListProps, ScrollViewProps, ViewStyle } from 'react-native';
import type { useAnimatedScrollHandler } from 'react-native-reanimated';
import type { Intersection } from '@breeffy/types';
import type { AnimatedScrollView } from './ScrollableView';
import type { AnimatedFlatList } from './ScrollableFlatList';

type CommonProps<T> = Intersection<ScrollViewProps, FlatListProps<T>>;

export interface ScrollableCommon<T> {
  items: T[];
  disableIntervalMomentum: CommonProps<T>['disableIntervalMomentum'];
  snapToOffsets: CommonProps<T>['snapToOffsets'];
  scrollEventThrottle: CommonProps<T>['scrollEventThrottle'];
  horizontal: boolean;
  showsHorizontalScrollIndicator: boolean;
  decelerationRate: CommonProps<T>['decelerationRate'];
  contentOffset?: CommonProps<T>['contentOffset'];
  headerComponentStyle?: ViewStyle;
  footerComponentStyle?: ViewStyle;
  itemSeparator?: () => JSX.Element;
  renderItem: (item: T, index: number) => JSX.Element;
  onScroll: ReturnType<typeof useAnimatedScrollHandler>;
}

export type ScrollableViewRef = React.Ref<typeof AnimatedScrollView>;
export type ScrollableFlatListRef = React.Ref<typeof AnimatedFlatList>;
