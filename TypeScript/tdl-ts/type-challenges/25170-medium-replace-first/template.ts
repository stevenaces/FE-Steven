// my solution
type ReplaceFirst<T extends readonly unknown[], S, R> =
  T extends [infer F, ...infer L]
  ? F extends S
  ? [R, ...ReplaceFirst<L, never, R>]
  : [F, ...ReplaceFirst<L, S, R>]
  : []

export { ReplaceFirst }