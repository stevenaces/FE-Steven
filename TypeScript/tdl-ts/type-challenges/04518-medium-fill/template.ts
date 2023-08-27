// My solution
// 其实就是写一个 大于等于 和 小于 的比较判断，然后递归遍历，根据下表判断是否符合填充条件，符合就填充，不符合就保持原样

// 大于等于判断
type GET<A extends number, B extends number, cnt extends 1[] = []> =
  A extends B
  ? true
  : cnt['length'] extends A
  ? false
  : cnt['length'] extends B
  ? true
  : GET<A, B, [...cnt, 1]>

// 小于判断
type LT<A extends number, B extends number, cnt extends 1[] = []> =
  A extends B
  ? false
  : cnt['length'] extends A
  ? true
  : cnt['length'] extends B
  ? false
  : LT<A, B, [...cnt, 1]>

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Idx extends 1[] = []
> =
  T extends [infer F, ...infer R]
  ? GET<Idx['length'], Start> extends true
  ? LT<Idx['length'], End> extends true
  ? [N, ...Fill<R, N, Start, End, [...Idx, 1]>]
  : [F, ...Fill<R, N, Start, End, [...Idx, 1]>]
  : [F, ...Fill<R, N, Start, End, [...Idx, 1]>]
  : []

export { Fill };
