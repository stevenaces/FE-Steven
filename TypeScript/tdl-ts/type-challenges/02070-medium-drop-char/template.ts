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

export { DropChar };
