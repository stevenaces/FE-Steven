/**
 * 数组的重新构造
 */

// Push
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushRes = Push<[1, 2, 3], 4>;

// UnShift
type UnShift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type UnShiftRes = UnShift<[1, 2, 3], 4>;

// zip
type tuple1 = [1, 2];
type tuple2 = ["guang", "dong"];
type wantTuple = [[1, "guang"], [2, "dong"]];

// simple
type Zip<
	One extends [unknown, unknown],
	Two extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
	? Two extends [infer TwoFirst, infer TwoSecond]
		? [[OneFirst, TwoFirst], [OneSecond, TwoSecond]]
		: []
	: [];

type ZipRes = Zip<tuple1, tuple2>;

// complex
type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
	infer OneFirst,
	...infer OneRest
]
	? Other extends [infer OtherFirst, ...infer OtherRest]
		? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]
		: []
	: [];

type Zip2Res = Zip2<[1, 2, 3, 4], ["guang", "dong", "is", "friends"]>;

/**
 * 字符串的重新构造
 */

// 字符串字面量类型首字母大写
type CapitalizeStr<Str extends string> =
	Str extends `${infer First}${infer Rest}`
		? `${Uppercase<First>}${Rest}`
		: Str;

type CapitalizeStrRes = CapitalizeStr<"guang">;

// kab-case -> camelCase
type CamelCase<Str extends string> =
	Str extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
		: Str;

type CamelCaseRes = CamelCase<"dong_dong_dong_dong">; //dongDongDongDong

// 删除字符串某个子串
type DropSubStr<
	Str extends string,
	SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
	? DropSubStr<`${Prefix}${Suffix}`, SubStr>
	: Str;

type DropSubStrRes = DropSubStr<"~dong~~~", "~">;

/**
 * 函数类型的重新构造
 */

// 在已有函数类型上新增一个参数
type AppendArgument<Func extends Function, Arg> = Func extends (
	...args: infer Args
) => infer ReturnType
	? (...args: [...Args, Arg]) => ReturnType
	: never;

type AppendArgumentRes = AppendArgument<(name: string) => boolean, number>;

/**
 * 索引类型重新构造
 */

// 映射类型语法
type Mapping<Obj extends object> = {
	[Key in keyof Obj]: Obj[Key];
};

type Mapping2<Obj extends object> = {
	[Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type Mapping2Res = Mapping2<{ a: 1; b: 2 }>;

//除了可以对 Value 修改，也可以对 Key 修改，这就要用到 as 关键字 重映射

// 把索引类型 Key 首字母变为大写
type UppercaseKey<obj extends object> = {
	[Key in keyof obj as Key extends `${infer First}${infer Rest}`
		? `${Uppercase<First>}${Rest}`
		: Key]: obj[Key];
};

type UppercaseKeyRes = UppercaseKey<{ name: "dong"; age: 20 }>;

// 为了更加语义化，我们把obj限制为索引类型，而不是object
type UppercaseKey2<obj extends Record<string, any>> = {
	[K in keyof obj as Uppercase<K & string>]: obj[K];
};

type UppercaseKey2Res = UppercaseKey2<{ name: "dong"; age: 20 }>;

// ToReadonly
type ToReadonly<T> = {
	readonly [K in keyof T]: T[K];
};

type ToReadonlyRes = ToReadonly<{ name: string; age: number }>;

// ToPartial
type ToPartial<T> = {
	[K in keyof T]?: T[K];
};

type ToPartialRes = ToPartial<{ name: string; age: number }>;

// ToMutable
type ToMutable<T> = {
	-readonly [K in keyof T]: T[K];
};

type ToMutableRes = ToRequire<{ readonly name: string; age: number }>;

// ToRequire
type ToRequire<T> = {
	[K in keyof T]-?: T[K];
};

type ToRequireRes = ToRequire<{ name?: string; age?: number }>;

// 根据索引值做过滤，索引值不为ValueType的索引会设置为 never，而never最后不会出现在索引类型中，就达到了过滤的效果
type FilterByValueType<T extends Record<string, any>, ValueType> = {
	[K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

interface Person {
	name: string;
	age: number;
	hobby: string[];
}

type FilterByValueTypeRes = FilterByValueType<Person, number | string>;
