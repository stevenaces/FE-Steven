type ConstructTuple<L extends number, Res extends unknown[] = []> =
  Res['length'] extends L
  ? Res
  : ConstructTuple<L, [...Res, unknown]>

export { ConstructTuple };
