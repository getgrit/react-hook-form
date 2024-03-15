type ConcatTupleTenTimes<T extends unknown[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
];

export const tuple = type HundredTuple<T> = ConcatTupleTenTimes<ConcatTupleTenTimes<[T]>>;
