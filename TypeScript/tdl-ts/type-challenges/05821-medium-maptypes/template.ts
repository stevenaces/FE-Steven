type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
  ? R extends { mapFrom: T[K] }
  ? R['mapTo']
  : never
  : T[K]
}

type R = { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
type res = R['mapFrom'] // string | Date

export { MapTypes };
