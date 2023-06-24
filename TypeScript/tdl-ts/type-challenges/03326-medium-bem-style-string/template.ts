// solution 1
// 穷举所有情况，根据不同情况构造不同结果
// type BEM<
// 	B extends string,
// 	E extends string[],
// 	M extends string[]
// > = E["length"] extends 0
// 	? M["length"] extends 0
// 		? B
// 		: `${B}--${M[number]}`
// 	: M["length"] extends 0
// 	? `${B}__${E[number]}`
// 	: `${B}__${E[number]}--${M[number]}`;

// solution 2
// 根据判断是否是联合类型，进行封装
// https://github.com/type-challenges/type-challenges/issues/14092
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnion<U> = IsNever<U> extends true ? "" : U;

type BEM<
	B extends string,
	E extends string[],
	M extends string[]
> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`;

export { BEM };
