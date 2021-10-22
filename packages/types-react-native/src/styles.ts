import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * PropsWithStyle
 * @desc Add `style` property to `P`
 * @example
 *   type Props = { name: string; age: number };
 *
 *   // Expect: { name: string; age: number; style?: StyleProp<ViewStyle> };
 *   type WithStyle = PropsWithStyle<Props>;
 */
export type PropsWithStyle<
  P,
  S extends ViewStyle | TextStyle = ViewStyle
> = P & {
  style?: StyleProp<S>;
};
