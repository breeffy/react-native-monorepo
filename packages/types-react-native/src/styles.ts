import type {
  RecursiveArray,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';

/**
 * PropsWithSpreadStyle
 * @desc Add `style` property to `P`, adding constraint
 * so it can be used in spread operators
 * @example
 *   type T = PropsWithSpreadStyle<{name: string, age: number}>;
 *   const obj: T = {name: "Name", age: 20, style: {backgroundColor: "green"}};
 *   const newStyle = {...obj.style, flexDirection: "row"};
 */
export type PropsWithSpreadStyle<P, S = ViewStyle | TextStyle> = P & {
  style?: S | RecursiveArray<S>;
};

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
