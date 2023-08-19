type CheckRepeatedTuple<T extends unknown[], Pre extends unknown[] = []> =
  T extends [infer C, ...infer R]
  ? C extends R[number]
  ? true
  : C extends Pre[number]
  ? true
  : CheckRepeatedTuple<R, [...Pre, C]>
  : false


export { CheckRepeatedTuple };
