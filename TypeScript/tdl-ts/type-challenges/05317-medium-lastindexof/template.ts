
// my solution
import type { Equal } from '@type-challenges/utils'

// type LastIndexOf<T extends unknown[], U, Ans extends 1[] = [], Idx extends 1[] = [], P extends unknown[] = T> =
//   U extends P[number]
//   ? T extends [infer F, ...infer R]
//   ? Equal<F, U> extends true
//   ? LastIndexOf<R, U, Idx, [...Idx, 1], P>
//   : LastIndexOf<R, U, Ans, [...Idx, 1], P>
//   : Ans['length']
//   : -1

// optimal solution
type LastIndexOf<T extends any[], U> =
  T extends [...infer I, infer L]
  ? Equal<L, U> extends true
  ? I['length']
  : LastIndexOf<I, U>
  : -1

export { LastIndexOf };
