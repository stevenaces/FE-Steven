type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
	? { [P in F & string]: TupleToNestedObject<R, U> }
	: U;

export { TupleToNestedObject };
