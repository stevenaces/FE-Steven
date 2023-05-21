type Flatten<Arr extends unknown[], Res extends any[] = []> = Arr extends [
	infer F,
	...infer R
]
	? F extends unknown[]
		? Flatten<[...F, ...R], Res>
		: Flatten<[...R], [...Res, F]>
	: Res;

export { Flatten };
