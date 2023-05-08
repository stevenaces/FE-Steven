/* 有时候提取或构造的数组元素个数不确定、字符串长度不确定、对象层数不确定 */
/**
 *TypeScript 类型系统不支持循环，但支持递归。当处理数量（个数、长度、层数）不固定的类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。
 */

/**
 * 深层Promise解构
 */
// DeepPromiseValueType
type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
	infer ValueType
>
	? ValueType extends Promise<unknown>
		? DeepPromiseValueType<ValueType>
		: ValueType
	: never;

type DeepPromiseResult = DeepPromiseValueType<
	Promise<Promise<Promise<Record<string, any>>>>
>;

// 简化版本
type DeepPromiseValueType2<P> = P extends Promise<infer ValueType>
	? DeepPromiseValueType2<ValueType>
	: P;

type DeepPromiseResult2 = DeepPromiseValueType<
	Promise<Promise<Promise<Record<string, any>>>>
>;

/**
 * 数组类型递归
 */

// ReverseArr 倒序
type ReverseArr<Arr extends unknown[]> = Arr extends [
	infer First,
	...infer Rest
]
	? [...ReverseArr<Rest>, First]
	: Arr;

type ReverseArrRes = ReverseArr<[1, 2, 3, 4, 5]>;

// Includes 是否包含
// type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
type IsEqual<A, B> = (A extends B ? true : false) &
	(B extends A ? true : false);

type Includes<Arr extends unknown[], FindItem> = Arr extends [
	infer First,
	...infer Rest
]
	? IsEqual<First, FindItem> extends true
		? true
		: Includes<Rest, FindItem>
	: false;

type IncludesRes = Includes<[1, 2, 3, 4, 5], 4>;

// RemoveItem 删除指定元素
type RemoveItem<
	Arr extends unknown[],
	Item,
	Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
	? IsEqual<First, Item> extends true
		? RemoveItem<Rest, Item, Result>
		: RemoveItem<Rest, Item, [...Result, First]>
	: Result;

type RemoveItemRes = RemoveItem<[1, 2, 2, 3, 4], 2>;

// BuildArray 指定类型和长度，构建对应长度的同类型数组
type BuildArray<
	Length extends number,
	Ele extends unknown,
	Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayRes = BuildArray<5, string>;

/**
 * 字符串类型递归
 */
// ReplaceAll
type ReplaceAll<
	Str extends string,
	From extends string,
	To extends string
> = Str extends `${infer Left}${From}${infer Right}`
	? ReplaceAll<`${Left}${To}${Right}`, From, To>
	: Str;

type ReplaceAll2<
	Str extends string,
	From extends string,
	To extends string
> = Str extends `${infer Left}${From}${infer Right}`
	? `${Left}${To}${ReplaceAll2<Right, From, To>}`
	: Str;

type ReplaceAllRes = ReplaceAll<"guang guang guang", "guang", "dong">;
type ReplaceAllRes2 = ReplaceAll2<"guang ac guang guang", "guang", "dong">;

// StringToUnion
type StringToUnion<Str extends string> =
	Str extends `${infer First}${infer Rest}`
		? First | StringToUnion<Rest>
		: never;

type StringToUnionRes = StringToUnion<"Hello">;

// ReverseString
type ReverseString<
	Str extends string,
	Result extends string = ""
> = Str extends `${infer First}${infer Rest}`
	? ReverseString<Rest, `${First}${Result}`>
	: Result;

type ReverseStringRes = ReverseString<"Hello">;

/**
 * 对象类型的递归
 */

// 只有一个层级的索引类型设置为只读(之前写的)
type ToReadonly2<T> = {
	readonly [K in keyof T]: T[K];
};

// 但是如果是这样一个对象呢？如何层层为其加 readonly
type obj = {
	a: {
		b: {
			c: {
				f: () => "dong";
				d: {
					e: {
						guang: string;
					};
				};
			};
		};
	};
};

type DeepToReadonly<Obj extends Record<string, any>> = {
	readonly [Key in keyof Obj]: Obj[Key] extends object
		? Obj[Key] extends Function
			? Obj[Key]
			: DeepToReadonly<Obj[Key]>
		: Obj[Key];
};

type DeepToReadonlyRes = DeepToReadonly<obj>;
// 上述虽然能够实现深层加readonly，但是只有在使用的时候，才会触发计算，那如何一开始就让类型计算好呢？

type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
	? {
			readonly [Key in keyof Obj]: Obj[Key] extends object
				? Obj[Key] extends Function
					? Obj[Key]
					: DeepReadonly2<Obj[Key]>
				: Obj[Key];
	  }
	: never;

type DeepReadonly2Res = DeepReadonly2<obj>;
