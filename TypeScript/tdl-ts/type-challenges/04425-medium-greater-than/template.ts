type Build<
	Num extends number,
	Ele extends unknown = unknown,
	Res extends any[] = []
> = Res["length"] extends Num ? Res : Build<Num, Ele, [...Res, Ele]>;

type Add<A extends number, B extends number> = [
	...Build<A>,
	...Build<B>
]["length"];

/* solution */
// type GreaterThan<
// 	T extends number,
// 	U extends number,
// 	I extends number = 0
// > = T extends U
// 	? false
// 	: T extends I
// 	? false
// 	: U extends I
// 	? true
// 	: GreaterThan<T, U, Add<I, 1>>;

/* brief */
type GreaterThan<
	T extends number,
	U extends number,
	Res extends any[] = []
> = T extends U
	? false
	: T extends Res["length"]
	? false
	: U extends Res["length"]
	? true
	: GreaterThan<T, U, [...Res, any]>;

export { GreaterThan };
