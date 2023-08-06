// 这次是真的不会做，看的答案，但是看完答案之后又豁然开朗，递归求解是如此的清晰


// solution 1，对应我之前的递归思维，使用一个中间变量保存临时结果值，当递归条件不满足的时候，这个中间变量保存的就是最终结果
// type Subsequence<T extends any[], Prefix extends any[] = []> =
//   T extends [infer F, ...infer R]
//   ? Subsequence<R, Prefix | [...Prefix, F]>
//   : Prefix

// solution 2 [optimal]，递归过程很好的“展示”了这个题的求解过程
type Subsequence<T extends any[]> =
  T extends [infer F, ...infer R]
  ? [F] | [...Subsequence<R>] | [F, ...Subsequence<R>]
  : []


export { Subsequence };
