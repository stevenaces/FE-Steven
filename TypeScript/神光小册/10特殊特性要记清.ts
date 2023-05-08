/* 给我们一种类型，让我们判断是何种类型，应该要利用各种类型的特性来判断 */

// IsAny
/* Any 类型与任何类型交叉 都是any */
type IsAny<T> = "a" extends "b" & T ? true : false;

type IsAnyRes1 = IsAny<any>;
type IsAnyRes2 = IsAny<number>;

// IsEqual
type IsEqual<A, B> = (A extends B ? true : false) &
	(B extends A ? true : false);

type IsEqualRes1 = IsEqual<number, number>;
type IsEqualRes2 = IsEqual<"a", any>; // 此处结果应该是 false, 但是结果为 true，是错误的

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
	T
>() => T extends B ? 1 : 2
	? true
	: false;

type IsEqual2Res = IsEqual2<"a", any>; // 这里就对了，如果要理解，需要理解TypeScript原理

// IsUnion
/* 联合类型在条件类型左边时，会分布式传入，分散成单个传入 */
type IsUnion<A, B = A> = A extends B ? ([B] extends [A] ? false : true) : never;

type IsUnionRes1 = IsUnion<1>;
type IsUnionRes2 = IsUnion<1 | 2>;

// IsNever
/* never 在条件类型左侧，直接返回never */
type TestNever<T> = T extends number ? 1 : 2;

type TestNeverRes = TestNever<never>; // 这里并没有返回 2 这个类型，体现了 never的特性

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>;
type IsNeverRes2 = IsNever<number>;

/* 此外，any 在条件类型左侧，会返回 trueType 和 falseType 的联合类型*/
type TestAny<T> = T extends number ? 1 : 2;

type TestAnyRes = TestAny<any>;

// IsTuple
/* 元祖和数组的区别，元祖length属性是字面量类型，数组length属性是number类型 */
type TupleLen = [1, 2, 3]["length"];
type ArrayLen = string[]["length"];

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
	T
>() => T extends B ? 1 : 2
	? false
	: true;

type IsTuple<T> = T extends [...params: infer Eles]
	? NotEqual<Eles["length"], number>
	: false;

type IsTupleRes1 = IsTuple<[1, 2, 3]>;
type IsTupleRes2 = IsTuple<number[]>;

// 联合转交叉
/* 可以利用函数参数的逆变（父类型可以传给子类型）来实现 */
type UnionToIntersection<U> = (
	U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
	? R
	: never;

type UnionToIntersectionRes = UnionToIntersection<{ a: 1 } | { b: 2 }>;

// GetOptional
/* 可选索引的特性：可选索引的值为undefined 和 值类型 的联合类型 */
type obj = {
	name: string;
	age?: number;
	sex: string;
};

type GetOptional<Obj extends Record<string, any>> = {
	[Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type optionObj = Pick<obj, "age">;
let option: optionObj = {}; // 理解GetOptional中 “ {} extends Pick<Obj, Key> ? Key : never ”

type GetOptionalRes = GetOptional<obj>;

// GetRequired
type GetRequired<Obj extends Record<string, any>> = {
	[Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};

// 再把上面判断是否必须封装一下
type IsRequired<Obj, Key extends keyof Obj> = {} extends Pick<Obj, Key>
	? never
	: Key;

type GetRequiredRes = GetRequired<obj>;

// RemoveIndexSignature
/* 索引类型可能有索引，可能有索引签名。索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

type Dong = {
	[key: string]: any;
	sleep(): void;
};

type RemoveIndexSignatureRes = RemoveIndexSignature<Dong>;

// ClassPublicProps
class Dog {
	public name: string;
	protected age: number;
	private hobbies: string[];

	constructor(name: string, age: number, hobbies: string[]) {
		this.name = name;
		this.age = age;
		this.hobbies = hobbies;
	}
}

type publicKey = keyof Dog;
/* keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略 */
type ClassPublicProps<Obj extends Record<string, any>> = {
	[Key in keyof Obj]: Obj[Key];
};
type ClassPublicPropsRes = ClassPublicProps<Dog>;

// as const
const obj = { a: 1, b: 2 };
type objType = typeof obj;

const arr = [1, 2, 3];
type arrType = typeof arr;

const obj2 = { a: 1, b: 2 } as const;
type obj2Type = typeof obj2;

const arr2 = [1, 2, 3] as const;
type arr2Type = typeof arr2;

/* 通过 as const 推导出来的类型有 readonly 修饰，所以在模式匹配做提取的时候也要加 readonly */
type ReverseArr<Arr> = Arr extends [infer A, infer B, infer C]
	? [C, B, A]
	: never;

type ReverseArrRes = ReverseArr<arr2Type>; // 此时结果是 never

type ReverseArr2<Arr> = Arr extends readonly [infer A, infer B, infer C]
	? [C, B, A]
	: never;

type ReverseArr2Res = ReverseArr2<arr2Type>;
export {};
