type StringToArr<
	S extends string,
	Res extends string[] = []
> = S extends `${infer F}${infer R}` ? StringToArr<R, [...Res, F]> : Res;

type Combination<A extends string, B extends string = A> =
	| ""
	| A
	| B
	| `${A}${B}`
	| `${B}${A}`;

type HelpAllCombination<A extends string, B extends string = A> = A extends A
	? Combination<A, HelpAllCombination<Exclude<B, A>>>
	: never;

type AllCombinations<S extends string> = S extends ""
	? ""
	: HelpAllCombination<StringToArr<S>[number]>;

type T = "A" | "B" | "C";
type check = T extends string ? true : false;

export { AllCombinations };
