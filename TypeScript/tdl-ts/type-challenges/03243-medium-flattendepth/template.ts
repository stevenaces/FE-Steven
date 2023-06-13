// solution 1
type Build<
	Num extends number,
	Ele extends unknown = unknown,
	Res extends any[] = []
> = Res["length"] extends Num ? Res : Build<Num, Ele, [...Res, Ele]>;

type Add<X extends number, Y extends number> = [
	...Build<X>,
	...Build<Y>
]["length"];

type LessEqualThan<
	X extends number,
	Y extends number,
	Tmp extends unknown[] = []
> = X extends Y
	? true
	: Tmp["length"] extends X
	? true
	: Tmp["length"] extends Y
	? false
	: LessEqualThan<X, Y, [...Tmp, unknown]>;

type FlattenDepth<T, Depth extends number = 1, Cur = 0> = T extends []
	? []
	: LessEqualThan<Cur & number, Depth> extends true
	? T extends [infer F, ...infer R]
		? [
				...FlattenDepth<F, Depth, Add<Cur & number, 1>>,
				...FlattenDepth<R, Depth, Cur>
		  ]
		: [T]
	: [T];

// solution 2
// https://github.com/type-challenges/type-challenges/issues/15373
// type FlattenDepth<
// 	T extends any[],
// 	S extends number = 1,
// 	U extends any[] = []
// > = U["length"] extends S
// 	? T
// 	: T extends [infer F, ...infer R]
// 	? F extends any[]
// 		? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>]
// 		: [F, ...FlattenDepth<R, S, U>]
// 	: T;

export { FlattenDepth };
