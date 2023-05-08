/* 基本类型 */
let bool: boolean = true;

let num: number = 1;

let str: string = "steven";

let nullVal: null = null;

let symbolVal: symbol = Symbol("steve");

let undefinedVal: undefined = undefined;

// let bigIntVal: bigint = BigInt(Number.MAX_SAFE_INTEGER);

let o: object = {
	name: "steven",
	age: 19,
};

/* 元祖 */
type Tuple = [string, number];

let stu: Tuple = ["steven", 19];

/* 接口 */
interface IPerson {
	name: string;
	age: number;
}

// 1.接口描述对象
class Person implements IPerson {
	name: string;
	age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

let stu2: IPerson = {
	name: "steven",
	age: 19,
};

// 2.接口描述函数
interface SayHello {
	(name: string): string;
}

const func: SayHello = (name: string) => {
	return `Hello, ${name}`;
};

// 3.接口描述构造器
interface PersonConstructor {
	new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor): IPerson {
	return new ctor("steven", 19);
}

/* 
  索引类型
  对象类型，class类型在ts中叫索引类型
*/
// 索引签名
interface IStudent {
	[prop: string]: string | number;
}

const obj: IStudent = {};
obj.name = "steven";
obj.age = 19;

/* 枚举 */
enum Transpiler {
	Babel = "babel",
	Postcss = "postcss",
	Terser = "terser",
	Prettier = "prettier",
	TypeScriptCompiler = "tsc",
}

const transpiler = Transpiler.TypeScriptCompiler;

/* 字面量类型 */

function foo(str: `#${string}`) {}

// foo("aaa");  // 报错，不是#开头
foo("#aaa");

/* 四种特殊类型 */

// 1.never: 代表不可达，不如函数抛出异常，返回值就是never；函数死循环，函数返回值为never
let neverVal: never;

// 2.void: 代表为空，可以是 undefined, never
let voidVal: void = undefined;

// 3.any: 代表任意类型，任何值都可以赋值给这个类型变量，这个类型变量也可以赋值给任意值
let anyVal: any = 1;

// 4.unknown: 代表未知类型，任何值都可以赋值这个类型变量，这个类型变量却不可以赋值给其他类型
let unknownVal: unknown = 3;

/* TypeScript类型运算 */
// 1.条件 extends ? :
type isTwo<T> = T extends 2 ? true : false;
type isTwoRes1 = isTwo<1>;
type isTwoRes2 = isTwo<2>;

// 2.推导 infer
// 提取元祖类型的第一个元素
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
	? T
	: never;
type FirstRes = First<[1, "steven", false]>;

// 3.联合 |
// 可以是几个类型之一
type Union = 1 | 2 | 3;
let UnionVal1: Union = 2;
// let UnionVal2: Union = 4  // 报错

// 4.交叉 &
// 代表类型合并
type ObjType = { a: number } & { c: boolean };
let ObjTypeVal: ObjType = {
	a: 1,
	c: false,
};
// 注意，同一类型会被合并，不同类型没法合并，会被抛弃
type res = "aaa" & 222;

// 5.映射类型
// 对索引类型所修改
type MapType<T> = {
	[K in keyof T]: T[K];
};

// 重映射，就是改变索引名字
type MapType2<T> = {
	[K in keyof T as `${K & string}${K & string}${K & string}`]: [
		T[K],
		T[K],
		T[K]
	];
};

type MapType2Res = MapType2<{ a: 1; b: 2 }>;
