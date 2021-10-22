import type { StyleProp, ViewStyle } from 'react-native';

export type WithStyleProp<P> = {
  style?: StyleProp<P>;
};

export type ViewStyleProp = WithStyleProp<ViewStyle>;
