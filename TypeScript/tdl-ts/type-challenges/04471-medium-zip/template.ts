/* my solution */
// type Zip<T, U, Res extends any[] = []> = T extends [infer TF, ...infer TR]
// 	? U extends [infer UF, ...infer UR]
// 		? Zip<TR, UR, [...Res, [TF, UF]]>
// 		: Res
// 	: Res;

// https://github.com/type-challenges/type-challenges/issues/5619
type Zip<
	T extends any[],
	U extends any[],
	Res extends any[] = []
> = Res["length"] extends T["length"] | U["length"]
	? Res
	: Zip<T, U, [...Res, [T[Res["length"]], U[Res["length"]]]]>;

export { Zip };
