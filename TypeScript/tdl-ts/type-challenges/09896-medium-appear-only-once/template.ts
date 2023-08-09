// my solution
// type FindEles<
//   T extends any[],
//   Prefix extends any[] = [],
//   Res extends any[] = []
// > =
//   T extends [infer F, ...infer R]
//   ? F extends Prefix[number]
//   ? FindEles<R, Prefix, Res>
//   : F extends R[number]
//   ? FindEles<R, [...Prefix, F], Res>
//   : FindEles<R, Prefix, [...Res, F]>
//   : Res

// other solution
type FindEles<
  T extends any[],
  duplicate = never
> =
  T extends [infer F, ...infer R]
  ? F extends duplicate
  ? FindEles<R, duplicate>
  : F extends R[number]
  ? FindEles<R, duplicate | F>
  : [F, ...FindEles<R, duplicate>]
  : []

export { FindEles };
