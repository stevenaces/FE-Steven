type Reverse<T> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T;

type FlipArguments<T extends Function> = T extends (...args: infer P) => infer U
	? (...args: Reverse<P>) => U
	: never;

export { FlipArguments };
