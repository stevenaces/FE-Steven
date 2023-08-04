/* my solution 1, 过不了大数 */
type Build<N, Res extends 1[] = []> =
  Res['length'] extends N
  ? Res
  : Build<N, [...Res, 1]>

// type NumberRange<L extends number, H extends number, Count extends 1[] = Build<L>> =
//   Count['length'] extends H
//   ? H
//   : Count['length'] | NumberRange<L, H, [...Count, 1]>

/* other 1 */
// Utils[5] = [0, 1, 2, 3, 4, 5]
type Utils<L, C extends 1[] = [], R = L> =
  C['length'] extends L
  ? R
  : Utils<L, [...C, 1], C['length'] | R>

// type NumberRange<L, H> = L | Exclude<Utils<H>, Utils<L>>

// 然后自己写一个实现 Utils 的类似工具，在N大于50左右，就报错了，导致最后也是大数过不了
type Util<N, Count extends 1[] = []> =
  Count['length'] extends N
  ? N
  : Count['length'] | Util<N, [...Count, 1]>

/* other 2， 也就是上面的思想整合 */
type NumberRange<
  L extends number,
  H extends number,
  Idx extends 1[] = L extends 0 ? [] : [1, 1],
  Res = never> =
  Idx['length'] extends H
  ? H | Res
  : NumberRange<L, H, [...Idx, 1], Idx['length'] | Res>


export { NumberRange };
