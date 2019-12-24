import { StyleProp, TextStyle } from 'react-native';

// First, define a type that, when passed a union of keys, creates an object which
// cannot have those properties. I couldn't find a way to use this type directly,
// but it can be used with the below type.
type Impossible<K extends keyof any> = {
  [P in K]: never;
};

// The secret sauce! Provide it the type that contains only the properties you want,
// and then a type that extends that type, based on what the caller provided
// using generics.
export type NoExtraProperties<T, U extends T = T> = U &
  Impossible<Exclude<keyof U, keyof T>>;

export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmptyArray(
  styles: StyleProp<TextStyle>
): styles is NonEmptyArray<TextStyle> {
  return Array.isArray(styles) && styles.length > 0;
}

export function isArray<T>(
  value: unknown,
  isT: (param: unknown) => boolean,
  index: number = 0
): value is Array<T> {
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    if (value.length > index) {
      return isT(value[index]);
    }
    return false;
  }
  return false;
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/** Do not treat null as valid object */
export function isObject(value: unknown): value is object {
  if (isDefined(value)) {
    if (typeof value !== 'object') return false;
    return true;
  }
  return false;
}

export function isDefinedObject<T, K extends keyof T>(
  value: T
): value is NonNullable<T> & { [P in K]-?: Exclude<T[K], undefined | null> } {
  if (isDefined(value)) {
    if (typeof value !== 'object') return false;
    for (let prop in value) {
      if (value[prop] === undefined) return false;
    }
    return true;
  }
  return false;
}

export function hasDefinedProperty<T extends object, K extends keyof T>(
  style: T,
  prop: K
): style is T & { [P in K]-?: Exclude<T[K], undefined | null> } {
  return (
    style.hasOwnProperty(prop) &&
    style[prop] !== undefined &&
    style[prop] !== null
  );
}

export function hasDefinedProperties<T extends object, K extends keyof T>(
  style: T,
  props: K[]
): style is T & { [P in K]-?: Exclude<T[K], undefined | null> } {
  let isAllValid = false;
  for (const prop of props) {
    let isValid = hasDefinedProperty(style, prop);
    if (!isValid) {
      isAllValid = false;
      break;
    }
  }
  return isAllValid;
}
