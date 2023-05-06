import type { Equal, Expect } from "@type-challenges/utils";

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
	? Equal<F, U> extends true
		? true
		: Includes<R, U>
	: false;

type EqualXY<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
	? 1
	: 2
	? true
	: false;

type a = { 0: true; 1: false; 2: false; 3: true };

type Iternative<T extends readonly any[], U> = {
	[K in keyof T]: Equal<T[K], U>;
};

// 也是答案，但是要理解
type IterativeIncludes<T extends readonly any[], U> = {
	[K in keyof T]: Equal<T[K], U>;
}[number] extends false
	? false
	: true;

type res = Iternative<[1, 2, 3, 5, 6, 7], 7>[number];
type res1 = keyof [1, 2, 3, 4];

export { Includes };
