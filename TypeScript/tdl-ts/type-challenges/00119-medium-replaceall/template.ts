// type ReplaceAll<
// 	S extends string,
// 	From extends string,
// 	To extends string,
// 	Res extends string = ""
// > = From extends ""
// 	? S
// 	: S extends `${infer Head}${From}${infer Tail}`
// 	? ReplaceAll<`${Tail}`, From, To, `${Res}${Head}${To}`>
// 	: `${Res}${S}`;

type ReplaceAll<
	S extends string,
	From extends string,
	To extends string
> = From extends ""
	? S
	: S extends `${infer R1}${From}${infer R2}`
	? `${R1}${To}${ReplaceAll<R2, From, To>}`
	: S;

export { ReplaceAll };
