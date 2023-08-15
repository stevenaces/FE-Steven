type Triangular<N extends number, Idx extends 1[] = [], Sum extends 1[] = []> =
  Idx['length'] extends N
  ? [...Sum, ...Idx]['length']
  : Triangular<N, [...Idx, 1], [...Sum, ...Idx]>

export { Triangular };
