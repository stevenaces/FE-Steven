type Join<T, U extends number | string> =
  T extends [infer F extends string, ...infer R]
  ? R['length'] extends 0
  ? `${F}`
  : `${F}${U}${Join<R, U>}`
  : ''

export { Join };
