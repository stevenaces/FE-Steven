/* 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。 */

type Union = "a" | "b" | "c";

// 将 Union联合类型中的"a" 类型大写
type UppercaseA<Item extends string> = Item extends "a"
	? Uppercase<Item & string>
	: Item;

type UppercaseARes = UppercaseA<Union>;

type str = `${Union}~~`;

// kab-case -> camelCase
type CamelCase<Str extends string> =
	Str extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
		: Str;

type CamelCaseRes = CamelCase<"aa_bb_cc">;

// 如果是需要转换的类型是数组，此时需要递归处理
type CamelCaseArr<Arr extends unknown[]> = Arr extends [
	infer First,
	...infer Rest
]
	? [CamelCase<First & string>, ...CamelCaseArr<Rest>]
	: [];

type CamelCaseArrRes = CamelCaseArr<["aa_bb_cc", "bb_cc", "xx_yy"]>;

// 如果是联合类型，此时就不需要了，直接使用CamelCase类型工具进行转换
type CamelCaseUnionRes = CamelCase<"aa_bb_cc" | "bb_cc" | "xx_yy">;
// 可以通过 Arr[number] 快速将数组转换为 联合类型
type CamelCaseUnionRes2 = CamelCase<["aa_bb_cc", "bb_cc", "xx_yy"][number]>;

/* 判断联合类型 */
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionRes1 = IsUnion<"a" | "b" | "c">;
type IsUnionRes2 = IsUnion<["a", "b", "c"]>;

/**
 * 理解 联合类型 是 分布式条件类型
 */
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionRes = TestUnion<"a" | "b" | "c">;
type TestUnionRes2 = TestUnion<["a", "b", "c"]>;

/**
 * 理解 联合类型
 * 
当 A 是联合类型时：
  1. A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。
  2. A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。
 */

/* BEM block__element--modifier */
type BEM<
	Block extends string,
	Ele extends string[],
	Modifier extends string[]
> = `${Block}__${Ele[number]}--${Modifier[number]}`;

type BEMRes = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

/* 全组合类型 */
// 任何两个类型的组合
type Combination<A extends string, B extends string> =
	| A
	| B
	| `${A}${B}`
	| `${B}${A}`;

type AllCombination<A extends string, B extends string = A> = A extends A
	? Combination<A, AllCombination<Exclude<B, A>>>
	: never;

type AllCombinationRes = AllCombination<"a" | "b" | "c">;
export {};
