type Space = " " | "\t" | "\n";

type TrimLeft<S extends string> = S extends `${Space}${infer R}`
	? TrimLeft<R>
	: S;
export { TrimLeft };
