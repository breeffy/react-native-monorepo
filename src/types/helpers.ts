export type ChangePropertyType<T, P extends PropertyKey, V> = Omit<T, P> &
  { [S in P]: V };
