type Build<
	Len extends number,
	Ele = unknown,
	Res extends any[] = []
> = Res["length"] extends Len ? Res : Build<Len, Ele, [...Res, Ele]>;

/* 第一种：迭代解法 */
type Add<A extends number, B extends number> = [
	...Build<A>,
	...Build<B>
]["length"];

type Fibonacci<
	T extends number,
	S extends number = 3,
	prev extends number = 1,
	cur extends number = 2
> = T extends 1 | 2
	? 1
	: S extends T
	? cur
	: Fibonacci<T, Add<S, 1> & number, cur, Add<prev, cur> & number>;

/* 第二种：递归解法，暂时没写出来 */
type Sub<A extends number, B extends number> = [...Build<A>] extends [
	...Build<B>,
	...infer R
]
	? R["length"]
	: never;

// type resSub = Sub<20, 1>

export { Fibonacci };
