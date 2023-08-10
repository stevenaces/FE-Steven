// my solution
type check0Str<S extends string> =
  S extends `${infer F}${infer R}`
  ? F extends '0'
  ? check0Str<R>
  : false
  : true

/**
 * 思路：
 *  数字类型转态：
 *  1       直接返回
 *  1.      直接返回
 *  1.x     检查x是否为全0，是则返回
 *  */

// type Integer<T extends number> =
//   number extends T
//   ? never
//   : `${T}` extends `${infer N1 extends number}.`
//   ? N1
//   : `${T}` extends `${infer N2 extends number}.${infer Tail}`
//   ? check0Str<Tail> extends true
//   ? N2
//   : never
//   : T

// other solution 1
// type Integer<T extends number> =
// number extends T
// ? never
// : `${T}` extends `${string}.${string}`
//   ? never
//   : T


// other solution 2
type Integer<T extends number> =
  `${T}` extends `${bigint}` ? T : never

export { Integer };
