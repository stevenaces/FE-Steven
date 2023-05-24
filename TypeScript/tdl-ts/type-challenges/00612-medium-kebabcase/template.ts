// 26个字母转联合类型时的硬编码
// type UpperLetter =
// 	| "A"
// 	| "B"
// 	| "C"
// 	| "D"
// 	| "E"
// 	| "F"
// 	| "G"
// 	| "H"
// 	| "I"
// 	| "J"
// 	| "K"
// 	| "L"
// 	| "M"
// 	| "N"
// 	| "O"
// 	| "P"
// 	| "Q"
// 	| "R"
// 	| "S"
// 	| "T"
// 	| "U"
// 	| "V"
// 	| "W"
// 	| "X"
// 	| "Y"
// 	| "Z";

// 写个工具类将字符串转联合类型
type StringToUnion<S> = S extends `${infer F}${infer R}`
	? F | StringToUnion<R>
	: never;
type UpperLetter = StringToUnion<"ABCDEFGHIJKLMNOPQRSTUVWXYZ">;

// 方法一
type KebabCase<S, C extends boolean = false> = S extends `${infer F}${infer R}`
	? F extends UpperLetter
		? C extends false
			? `${Lowercase<F>}${KebabCase<R, true>}`
			: `-${Lowercase<F>}${KebabCase<R, true>}`
		: `${F}${KebabCase<R, true>}`
	: S;

// 方法二
// type KebabCase<S extends string> = S extends `${infer R}${infer P}`
// 	? P extends Uncapitalize<P>
// 		? `${Lowercase<R>}${KebabCase<P>}`
// 		: `${Lowercase<R>}-${KebabCase<P>}`
// 	: S;
export { KebabCase };
