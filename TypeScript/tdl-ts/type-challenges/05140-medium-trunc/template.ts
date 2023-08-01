// my solution
// 先判断 '.3' 这种情况
// type Trunc<T extends number | string> =
//   `${T}` extends `.${any}`
//   ? '0'
//   : `${T}` extends `${infer N}.${any}`
//   ? N
//   : `${T}`

// solution [optimal]
// 将 '.3' -> '0.3'， 然后再统一判断
type Fill0<T extends number | string> = `${T}` extends `.${infer U}` ? `0.${U}` : `${T}`
type Trunc<T extends number | string> = Fill0<T> extends `${infer N}.${any}` ? N : `${T}`
export { Trunc };
