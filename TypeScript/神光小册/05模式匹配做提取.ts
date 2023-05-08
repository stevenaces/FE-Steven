/* Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。 */

/**
 * 在数组类型中使用
 */

// 获取第一个元素类型
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
	? First
	: never;

type GetFirstResult = GetFirst<[1, 2, 3]>;
type GetFirstResult2 = GetFirst<[]>;

// 获取最后一个元素类型
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
	? Last
	: never;

type GetLastResult = GetLast<[1, 2, 3]>;

// 去掉数组最后一个元素后的类型
type PopArr<Arr extends unknown[]> = Arr extends []
	? []
	: Arr extends [...infer Rest, unknown]
	? Rest
	: never;

type PopResult = PopArr<[1, 2, 3]>;
type PopResult2 = PopArr<[1]>;

// 去除数组第一个元素后的类型
type ShiftArr<Arr extends unknown[]> = Arr extends []
	? []
	: Arr extends [unknown, ...infer Rest]
	? Rest
	: never;

type ShiftResult = ShiftArr<[1, 2, 3]>;

/**
 * 在字符串中使用
 * 字符串类型也同样可以做模式匹配，匹配一个模式字符串，把需要提取的部分放到 infer 声明的局部变量里。
 */

// 判断某一字符串是不是以某一前缀开头
type StartWith<
	Str extends string,
	Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartsWithResult = StartWith<"guang and dong", "guang">;
type StartsWithResult2 = StartWith<"guang and dong", "dong">;

// 实现字符串替换
type ReplaceStr<
	Str extends string,
	From extends string,
	To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
	? `${Prefix}${To}${Suffix}`
	: Str;

type ReplaceStrResult = ReplaceStr<
	"guanguang's best friends is dong?",
	"?",
	"dong"
>;
type ReplaceStrResult2 = ReplaceStr<"abc", "?", "dong">;

//去掉右边空白字符Trim
type TrimRight<Str extends string> = Str extends `${infer Rest}${
	| " "
	| "\n"
	| "\t"}`
	? TrimRight<Rest>
	: Str;

type TrimRightResult = TrimRight<"good   ">;

//去掉左边空白字符Trim
type TrimLeft<Str extends string> = Str extends `${
	| " "
	| "\n"
	| "\t"}${infer Rest}`
	? TrimLeft<Rest>
	: Str;

type TrimLeftRightResult = TrimLeft<"   good">;
// 去掉字符串两侧字符
type TrimStr = TrimLeft<TrimRight<"    good    ">>;

/**
 * 函数类型匹配：获取函数参数类型和返回值类型
 */

// 获取函数参数类型
type GetParameters<Func extends Function> = Func extends (
	...args: infer Args
) => unknown
	? Args
	: never;

type ParametersResult = GetParameters<(name: string, age: number) => string>;

// 获取函数返回值类型
// 函数参数不能用 unknown[]，涉及到逆变
type GetReturnType<Func extends Function> = Func extends (
	...args: any[]
) => infer ReturnType
	? ReturnType
	: never;

type ReturnTypeResult = GetReturnType<() => "dong">;

// 获取this参数类型
class Dong {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	//这样指定this类型就能解决下面的通过call调用this问题，以及使用GetThisParametersType来获取this类型
	// hello(this: Dong) {
	//   return `Hello, I'm ${this.name}`;
	// }

	hello(): string {
		return `Hello, I'm ${this.name}`;
	}
}

const dong = new Dong("dong");
dong.hello();

dong.hello.call({ name: "steven" }); // 问题：call 调用的时候，这里this已经改了，但是ts没有检测出来

type GetThisParametersType<T> = T extends (
	this: infer ThisType,
	...args: any[]
) => unknown
	? ThisType
	: unknown;

// 如果希望看到类型，需要将Dong类里注释的 hello(this: Dong)声明打开
// 如果没有报错，说明没开启 strictBindCallApply 的编译选项，这个是控制是否按照原函数的类型来检查 bind、call、apply
type GetThisParametersTypeRes = GetThisParametersType<typeof dong.hello>;

/**
 * 构造器函数
 * 构造器函数与普通函数的区别就是构造器函数可以用new创建对象；
 * 同样也可以使用模式匹配做提取
 */

interface IPerson {
	name: string;
}

// 声明构造器类型用 interface
interface PersonConstructor {
	new (name: string): IPerson;
}

// 获取构造函数的实例类型
type GetInstanceType<ConstructorType extends new (...args: any) => any> =
	ConstructorType extends new (...args: any) => infer InstanceType
		? InstanceType
		: any;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

// 提取构造函数的参数类型
type GetParametersType<ConstructorType extends new (...args: any) => any> =
	ConstructorType extends new (...args: infer ArgsType) => any
		? ArgsType
		: never;

type GetParametersTypeRes = GetParametersType<PersonConstructor>;

/**
 * 索引类型
 */

type GetRefProps<Props> = "ref" extends keyof Props
	? Props extends { ref?: infer Value | undefined }
		? Value
		: never
	: never;

type GetRefPropsRes = GetRefProps<{ ref: 1; name: "dong" }>;
type GetRefPropsRes2 = GetRefProps<{ name: "dong" }>;
