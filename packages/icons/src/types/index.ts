import type { StyleProp, TextStyle } from 'react-native';

/** Converts array to union of array values */
/** type Foo = ValuesOf<["key1", "key2"]>   */
/** becomes type Foo = "key1" | "key2"      */
export type ValuesOf<T extends any[]> = T[number];
export type Key = string | number | symbol;
export type Keys = Key[];

/** Type describing objects, i.e. non-primitive values        */
/** excluding Array or Function types                         */
/** which are considered as subtypes of "object" type         */
/** in Javascript                                             */
/** If type T doesn't satisfy requirements then               */
/** type ObjectAndNotArrayOrFunction<T> will be converged     */
/** to type never, indicating that type T is not a valid type */
export type ObjectAndNotArrayOrFunction<T> = T extends { [key in Key]: any }
  ? T extends Array<any> | Function
    ? never
    : T
  : never;

/** Type which is union of keys of T type,                                         */
/** if T satisfies requirements of ObjectAndNotArrayOrFunction<T>, i.e.            */
/** it is an object type, but not Array or Function                                */
/** If type T doesn't satisfy requirements then                                    */
/** type UnionOfObjectKeys<T> will be converged                                    */
/** to type never, indicating that type T is not a valid type                      */
/** Examples:                                                                      */
/** UnionOfObjectKeys<{ key1: string, key2: number }> becomes "key1" | "key2" type */
/** UnionOfObjectKeys<number> becomes "never" type                                 */
/** UnionOfObjectKeys<["first", 2]> becomes "never" type                           */
export type UnionOfObjectKeys<
  T,
  O = ObjectAndNotArrayOrFunction<T>
> = T extends O ? keyof T : never;

/** Type describing objects (specifically ObjectAndNotArrayOrFunction<T>), which are: */
/** always have required key indicating as K type                                     */
/** and values in these keys (object[key]) can't be null or undefined                 */
/** If type T doesn't satisfy requirements then this type                             */
/** will be converged to type "never", indicating that type T is not a valid type     */
export type ObjectWithDefinedProperty<
  T,
  K,
  O = ObjectAndNotArrayOrFunction<T>,
  KS = UnionOfObjectKeys<O> & K
> = KS extends Key
  ? O extends { [key in KS]: any }
    ? O & { [P in KS]-?: Exclude<O[P], undefined | null> }
    : never
  : never;

/** Type describing objects (specifically ObjectAndNotArrayOrFunction<T>), which are: */
/** always have required keys indicating as K type                                    */
/** and values in these keys (object[key]) can't be null or undefined                 */
/** If type T doesn't satisfy requirements then this type                             */
/** will be converged to type "never", indicating that type T is not a valid type     */

// {
//   [P in ValuesOf<typeof keys>]-?: Exclude<T[P], undefined | null>;
// }
export type ObjectWithDefinedProperties<
  T,
  K,
  O = ObjectAndNotArrayOrFunction<T>,
  KS = UnionOfObjectKeys<O>
> = KS extends Key
  ? O extends { [key in KS]: any }
    ? K extends Array<KS>
      ? O & { [P in ValuesOf<K>]-?: Exclude<O[P], undefined | null> }
      : never
    : never
  : never;

/** Type describing objects (specifically ObjectAndNotArrayOrFunction<T>), which are: */
/** always have all object keys as required                                           */
/** and values in these keys (object[key]) can't be null or undefined                 */
/** If type T doesn't satisfy requirements then this type                             */
/** will be converged to type "never", indicating that type T is not a valid type     */
export type ObjectWithAllDefinedProperties<
  T,
  O = ObjectAndNotArrayOrFunction<T>,
  K = UnionOfObjectKeys<O>
> = K extends Key
  ? O extends { [key in K]: any }
    ? O & { [P in K]-?: Exclude<O[P], undefined | null> }
    : never
  : never;

// First, define a type that, when passed a union of keys, creates an object which
// cannot have those properties. I couldn't find a way to use this type directly,
// but it can be used with the below type.
export type Impossible<K extends keyof any> = {
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

export function isKey<T>(value: T): value is T extends Key ? T : never {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol'
  ) {
    return true;
  }
  return false;
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/** Do not treat null as valid object */
export function isAnyObject(value: unknown): value is object {
  if (isDefined(value)) {
    if (typeof value !== 'object') return false;
    return true;
  }
  return false;
}

export function isObject<T>(value: T): value is ObjectAndNotArrayOrFunction<T> {
  if (isAnyObject(value)) {
    if (Array.isArray(value)) return false;
    if (typeof value === 'function') return false;
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

export function isObjectHasProperty<
  T,
  O = ObjectAndNotArrayOrFunction<T>,
  K = UnionOfObjectKeys<O>
>(obj: T, prop: Key): prop is K extends Key ? K : never {
  if (isObject(obj)) {
    if (obj.hasOwnProperty(prop)) return true;
  }
  return false;
}

export function isObjectHasDefinedProperty<
  T,
  O = ObjectAndNotArrayOrFunction<T>,
  K = UnionOfObjectKeys<O>
>(obj: T, prop: K): obj is ObjectWithDefinedProperty<T, K> {
  if (isObject(obj) && isKey(prop)) {
    return (
      obj.hasOwnProperty(prop) && obj[prop] !== undefined && obj[prop] !== null
    );
  }
  return false;
}

export function isObjectHasDefinedProperties<
  T,
  O = ObjectAndNotArrayOrFunction<T>
>(
  obj: T,
  keys: Array<UnionOfObjectKeys<O>>
): obj is ObjectWithDefinedProperties<T, typeof keys> {
  let isAllValid = false;
  for (const key of keys) {
    let isValid = isObjectHasDefinedProperty(obj, key);
    if (!isValid) {
      isAllValid = false;
      break;
    }
  }
  return isAllValid;
}
