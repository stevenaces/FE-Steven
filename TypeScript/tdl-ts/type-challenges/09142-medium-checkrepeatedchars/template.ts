// my solution
// type CheckRepeatedChars<T extends string, Prefix extends string[] = []> =
//   T extends `${infer F}${infer R}`
//   ? F extends Prefix[number]
//   ? true
//   : CheckRepeatedChars<R, [...Prefix, F]>
//   : false

// other solution
// 将字符串分为第一个字符F，和后面的字符串R，检查R中有没有F，有的话则返回true，没有则继续递归检查R
type CheckRepeatedChars<T extends string> =
  T extends `${infer F}${infer R}`
  ? R extends `${string}${F}${string}`
  ? true
  : CheckRepeatedChars<R>
  : false
export { CheckRepeatedChars };
