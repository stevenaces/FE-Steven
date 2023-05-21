type LengthOfString<
	S extends string,
	StrToArr extends string[] = []
> = S extends `${infer F}${infer R}`
	? LengthOfString<R, [...StrToArr, F]>
	: StrToArr["length"];

// 对于第一个提取字符，使用 string 去匹配，而不用增加 infer
// type LengthOfString<
// 	S extends string,
// 	StrToArr extends string[] = []
// > = S extends `${string}${infer R}`
// 	? LengthOfString<R, [...StrToArr, string]>
// 	: StrToArr["length"];

export { LengthOfString };
