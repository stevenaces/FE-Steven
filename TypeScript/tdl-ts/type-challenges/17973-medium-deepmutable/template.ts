type DeepMutable<T extends Record<string, any>> = {
  -readonly [K in keyof T]:
  T[K] extends object
  ? T[K] extends Function
  ? T[K]
  : DeepMutable<T[K]>
  : T[K]
}

export { DeepMutable };
