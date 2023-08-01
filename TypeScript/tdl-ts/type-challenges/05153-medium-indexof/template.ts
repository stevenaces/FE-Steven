type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false

type IndexOf<T extends unknown[], U, Count extends unknown[] = []> =
  U extends T[number]
  ? T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
  ? Count['length']
  : IndexOf<R, U, [...Count, unknown]>
  : -1
  : -1

export { IndexOf };
