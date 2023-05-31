type ArrToString<A, Res extends string = ""> = A extends [infer F, ...infer R]
	? ArrToString<R, `${Res}${F & string}`>
	: Res;

type DropChar<
	S,
	C extends string,
	Res extends string[] = []
> = S extends `${infer F}${infer R}`
	? F extends C
		? DropChar<R, C, Res>
		: DropChar<R, C, [...Res, F]>
	: ArrToString<Res>;

// solution 1
// type DropChar<S, C> = S extends `${infer F}${C & string}${infer R}`
// 	? DropChar<`${F}${R}`, C & string>
// 	: S;

// solution 2
// type DropChar<S, C> = S extends `${infer X}${infer Y}`
// 	? `${X extends C ? "" : X}${DropChar<Y, C & string>}`
// 	: "";
export { DropChar };
