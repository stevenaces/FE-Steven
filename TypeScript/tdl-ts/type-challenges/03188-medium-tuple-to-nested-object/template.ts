// // solution 1
// type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
// 	? { [P in F & string]: TupleToNestedObject<R, U> }
// 	: U;

// solution 2
type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
	? Record<F & string, TupleToNestedObject<R, U>>
	: U;

export { TupleToNestedObject };
