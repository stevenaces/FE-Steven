type MergeAll<XS extends object[], Res = {}> =
  XS extends [infer F, ...infer R extends object[]]
  ? MergeAll<R, Omit<Res, keyof F> & {
    [K in keyof F]: K extends keyof Res ? F[K] | Res[K] : F[K]
  }>
  : Omit<Res, never>

export { MergeAll };
