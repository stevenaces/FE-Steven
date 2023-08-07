type StrToUnion<T extends string> =
  T extends `${infer F}${infer R}`
  ? F | StrToUnion<R>
  : never


// my solution
// type FirstUniqueCharIndex<
//   T extends string,
//   Idx extends 1[] = [],
//   Prefix extends string[] = []
// > =
//   T extends `${infer F}${infer R}`
//   ? R extends ''
//   ? -1
//   : F extends StrToUnion<R>
//   ? FirstUniqueCharIndex<R, [...Idx, 1], [...Prefix, F]>
//   : F extends Prefix[number]
//   ? FirstUniqueCharIndex<R, [...Idx, 1], Prefix>
//   : Idx['length']
//   : -1


// other solution [optimal]
// 只是将我的Idx 与 Prefix两个功能数组，合并为一个_Acc数组了
type FirstUniqueCharIndex<
  T extends string,
  _Acc extends string[] = []
> =
  T extends `${infer F}${infer R}`
  ? F extends _Acc[number]
  ? FirstUniqueCharIndex<R, [..._Acc, F]>
  : R extends `${string}${F}${string}`
  ? FirstUniqueCharIndex<R, [..._Acc, F]>
  : _Acc['length']
  : -1


export { FirstUniqueCharIndex };
