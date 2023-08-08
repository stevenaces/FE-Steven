// 提取构造
// 当 T 长度为 0 | 1 | 2 时，中间元素就是 T 本身
// 然后构造，不断递归提取提取中间元素，直至满足上面条件
type GetMiddleElement<T extends unknown[]> =
  T['length'] extends 0 | 1 | 2
  ? T
  : T extends [infer F, ...infer M, infer L]
  ? GetMiddleElement<M>
  : never

export { GetMiddleElement };
