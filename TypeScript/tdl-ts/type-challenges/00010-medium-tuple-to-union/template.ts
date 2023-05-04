type TupleToUnion<T extends (boolean | number | string)[]> = T[number];
// type TupleToUnion<T extends unknown[]> = T[number];

export { TupleToUnion };
