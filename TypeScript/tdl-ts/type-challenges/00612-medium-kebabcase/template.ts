type UpperLetter =
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z";

type StringToUnion<S> = S extends `${infer F}${infer R}`
	? F | StringToUnion<R>
	: never;
type res = StringToUnion<"ABC">;

type KebabCase<S, C extends boolean = false> = S extends `${infer F}${infer R}`
	? F extends UpperLetter
		? C extends false
			? `${Lowercase<F>}${KebabCase<R, true>}`
			: `-${Lowercase<F>}${KebabCase<R, true>}`
		: `${F}${KebabCase<R, true>}`
	: S;

export { KebabCase };
