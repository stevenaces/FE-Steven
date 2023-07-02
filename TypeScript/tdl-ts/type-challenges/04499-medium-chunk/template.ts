/* My solution */
type LessThan<
	A extends number,
	B extends number,
	C extends any[] = []
> = A extends B
	? false
	: B extends C["length"]
	? false
	: A extends C["length"]
	? true
	: LessThan<A, B, [...C, 1]>;

// Tmp 符合条件，就放到Res中
type Chunk<
	T extends any[],
	U extends number,
	Res extends any[] = [],
	Tmp extends any[] = [],
	C extends any[] = []
> = LessThan<C["length"], T["length"]> extends true
	? Tmp["length"] extends U
		? Chunk<T, U, [...Res, Tmp], [], C>
		: Chunk<T, U, Res, [...Tmp, T[C["length"]]], [...C, 1]>
	: Tmp extends []
	? Res
	: [...Res, Tmp];

export { Chunk };
