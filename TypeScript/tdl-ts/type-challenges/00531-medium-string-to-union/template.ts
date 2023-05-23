// type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
// 	? F | StringToUnion<R>
// 	: never;

type StringToUnion<
	T extends string,
	Res extends any[] = []
> = T extends `${infer F}${infer R}`
	? StringToUnion<R, [...Res, F]>
	: Res[number];
export { StringToUnion };
