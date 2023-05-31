// type PercentageParser<A extends string> = A extends ""
// 	? ["", "", ""]
// 	: A extends `+${infer Num}%`
// 	? ["+", Num, "%"]
// 	: A extends `+${infer Num}`
// 	? ["+", Num, ""]
// 	: A extends `-${infer Num}%`
// 	? ["-", Num, "%"]
// 	: A extends `-${infer Num}`
// 	? ["-", Num, ""]
// 	: A extends `${infer Num}%`
// 	? ["", Num, "%"]
// 	: A extends `${infer Num}`
// 	? ["", Num, ""]
// 	: never;

// type PercentageParser<A extends string> = A extends `${infer L}${infer R}`
// 	? L extends "+" | "-"
// 		? R extends `${infer Num}%`
// 			? [L, Num, "%"]
// 			: [L, R, ""]
// 		: A extends `${infer Num}%`
// 		? ["", Num, "%"]
// 		: ["", A, ""]
// 	: ["", "", ""];

// 封装工具类，使得逻辑更加清晰
type CheckPrefix<T> = T extends "+" | "-" ? T : never;
type CheckSuffix<T> = T extends `${infer Num}%` ? [Num, "%"] : [T, ""];

type PercentageParser<A extends string> = A extends `${CheckPrefix<
	infer L
>}${infer R}`
	? [L, ...CheckSuffix<R>]
	: ["", ...CheckSuffix<A>];

export { PercentageParser };
