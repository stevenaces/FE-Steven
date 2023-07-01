/* 学习 神光小册 后写的，但是过不了第3个case */
type IsNever<T> = [T] extends [never] ? true : false;

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
	T
>() => T extends B ? 1 : 2
	? false
	: true;

// type IsTuple<T> = IsNever<T> extends true
// 	? false
// 	: T extends [...params: infer Eles]
// 	? NotEqual<Eles["length"], number>
// 	: false;

/* https://github.com/type-challenges/type-challenges/issues/4491 */
type IsTuple<T> = IsNever<T> extends true
	? false
	: T extends readonly any[]
	? number extends T["length"]
		? false
		: true
	: false;

export { IsTuple };
