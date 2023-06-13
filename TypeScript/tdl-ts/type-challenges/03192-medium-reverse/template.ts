// solution 1
// type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
// 	? [...Reverse<R>, F]
// 	: T;

// solution 2
type Reverse<T extends unknown[], Res extends any[] = []> = T extends [
	infer F,
	...infer R
]
	? Reverse<R, [F, ...Res]>
	: Res;

export { Reverse };
