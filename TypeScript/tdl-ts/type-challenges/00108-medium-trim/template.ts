type Space = " " | "\t" | "\n";

type TrimL<S extends string> = S extends `${Space}${infer R}` ? TrimL<R> : S;

type TrimR<S extends string> = S extends `${infer R}${Space}` ? TrimR<R> : S;

// type Trim<S extends string> = TrimL<TrimR<S>>;

// 社区另外写法
type Trim<S extends string> = S extends
	| `${Space}${infer R}`
	| `${infer R}${Space}`
	? Trim<R>
	: S;

export { Trim };
