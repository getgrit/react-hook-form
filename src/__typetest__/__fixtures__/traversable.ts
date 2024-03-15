interface Base<T, V> {
  foo: T;
  bar: [T];
  baz: Array<T>;
  value: V;
}

export const traversable = type InfiniteType<T> = Base<InfiniteType<T>, T>;

export const traversable = type NullableInfiniteType<T> =
  | null
  | undefined
  | Partial<Base<NullableInfiniteType<T>, T>>;

export const traversable = type Depth3Type<T> = Base<Base<Base<never, T>, T>, T>;

export const traversable = interface Nested<T> {
  nested: T;
};
