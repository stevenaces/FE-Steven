// my solution, but it can't pass Square<100>
// recommend you to read https://github.com/type-challenges/type-challenges/issues/27822
type Build<N extends number, Res extends 1[] = []> =
  Res['length'] extends N
  ? Res
  : Build<N, [...Res, 1]>

type ToPos<N extends number> = `${N}` extends `-${infer Num extends number}` ? Num : N

type Square<T extends number, Res extends 1[] = [], cnt extends 1[] = [], N extends number = ToPos<T>, t extends 1[] = Build<N>> =
  cnt['length'] extends N
  ? Res['length']
  : Square<T, [...Res, ...t], [...cnt, 1]>

export { Square };
