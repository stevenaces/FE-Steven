// my solution
// type DeepMutable<T extends Record<string, any>> = {
//   -readonly [K in keyof T]:
//   T[K] extends object
//   ? T[K] extends Function
//   ? T[K]
//   : DeepMutable<T[K]>
//   : T[K]
// }

// other solution
type DeepMutable<T extends Record<string, any>> =
  T extends Function
  ? T
  : {
    - readonly [K in keyof T]: DeepMutable<T[K]>
  }
export { DeepMutable };
