import { Equal } from "@type-challenges/utils";

type CheckEleInArr<E, Arr extends unknown[]> =
  Arr extends [infer F, ...infer R]
  ? Equal<E, F> extends true
  ? true
  : CheckEleInArr<E, R>
  : false

type Unique<T extends unknown[], Res extends unknown[] = []> =
  T extends [infer F, ...infer R]
  ? CheckEleInArr<F, Res> extends true
  ? Unique<R, Res>
  : Unique<R, [...Res, F]>
  : Res

export { Unique };
