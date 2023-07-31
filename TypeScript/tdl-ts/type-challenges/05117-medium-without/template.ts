type ToUnion<T> = T extends any[] ? T[number] : T

// solution1 [my solution]
// type Without<T, U, Res extends unknown[] = []> =
//   T extends [infer F, ...infer R]
//   ? F extends ToUnion<U>
//   ? Without<R, U, Res>
//   : Without<R, U, [...Res, F]>
//   : Res

// solution2 [optimal]
type Without<T, U> =
  T extends [infer F, ...infer R]
  ? F extends ToUnion<U>
  ? Without<R, U>
  : [F, ...Without<R, U>]
  : T

export { Without };
