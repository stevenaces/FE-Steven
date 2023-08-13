// my solution 1 
// type Filter<T extends any[], P, Res extends unknown[] = []> =
//   T extends [infer F, ...infer R]
//   ? F extends P
//   ? Filter<R, P, [...Res, F]>
//   : Filter<R, P, Res>
//   : Res

// my solution 2
// 有了之前递归经验，这题终于自己也能写出不需要像上面那样再定义一个中间结果变量的形式了
type Filter<T extends any[], P> =
  T extends [infer F, ...infer R]
  ? F extends P
  ? [F, ...Filter<R, P>]
  : Filter<R, P>
  : []
export { Filter };
