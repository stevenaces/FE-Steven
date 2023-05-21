// type Flatten<Arr extends unknown[], Res extends any[] = []> = Arr extends [
// 	infer F,
// 	...infer R
// ]
// 	? F extends unknown[]
// 		? Flatten<[...F, ...R], Res>
// 		: Flatten<[...R], [...Res, F]>
// 	: Res;

type Flatten<T> = T extends []
	? []
	: T extends [infer First, ...infer Rest]
	? [...Flatten<First>, ...Flatten<Rest>]
	: [T];

export { Flatten };
