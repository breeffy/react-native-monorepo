import type { PropsWithChildren } from 'react';

export type ChangePropertyType<T, P extends PropertyKey, V> = Omit<T, P> & {
  [S in P]: V;
};

export type RequiredExcept<O extends {}, K extends keyof O> = {
  [P in keyof O as Exclude<P, K>]-?: O[P];
} & { [P in K]?: O[K] };

export type OptionalExcept<O extends {}, K extends keyof O> = {
  [P in keyof O as Exclude<P, K>]?: O[P];
} & { [P in K]-?: O[K] };

export type PropsWithRequiredChildren<T> = OptionalExcept<
  PropsWithChildren<T>,
  'children'
>;

/**
 * Intersection
 * @desc From `T` pick properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { age: number; }
 *   type DuplicateProps = Intersection<Props, DefaultProps>;
 */
export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
