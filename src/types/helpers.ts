export type ChangePropertyType<T, P extends PropertyKey, V> = Omit<T, P> &
  { [S in P]: V };

export type RequiredExcept<O extends {}, K extends keyof O> = {
  [P in keyof O as Exclude<P, K>]-?: O[P];
} &
  { [P in K]?: O[K] };
