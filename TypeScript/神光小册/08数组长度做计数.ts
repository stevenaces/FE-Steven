/* TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。 */

type num1 = [unknown]["length"];
type num2 = [unknown, unknown]["length"];

type BuildArray<
	Length extends number,
	Ele = unknown,
	Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

/**
 * 数组长度做计算
 */

// Add
type Add<Num1 extends number, Num2 extends number> = [
	...BuildArray<Num1>,
	...BuildArray<Num2>
]["length"];

type AddRes = Add<5, 8>;

// Sub
type Sub<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [
	...arr1: BuildArray<Num2>,
	...arr2: infer Rest
]
	? Rest["length"]
	: never;

type SubRes = Sub<7, 4>;

// Multi
type Multiply<
	Num1 extends number,
	Num2 extends number,
	Result extends unknown[] = []
> = Num2 extends 0
	? Result["length"]
	: Multiply<Num1, Sub<Num2, 1>, [...Result, ...BuildArray<Num1>]>;

type MultiRes = Multiply<3, 222>;

// Div
type Divide<
	Num1 extends number,
	Num2 extends number,
	CountArr extends unknown[] = []
> = Num1 extends 0
	? CountArr["length"]
	: Divide<Sub<Num1, Num2>, Num2, [...CountArr, unknown]>;

type DivideRes = Divide<12, 3>;

/**
 * 数组长度实现计数
 */
// StrLen
type StrLen<
	Str extends string,
	Result extends unknown[] = []
> = Str extends `${infer First}${infer Rest}`
	? StrLen<Rest, [...Result, unknown]>
	: Result["length"];

type StrLenRes = StrLen<"hello world">;

// GreatThan 大于比较：我们往一个数组类型中不断放入元素取长度，如果先到了 A，那就是 B 大，否则是 A 大

type GreatThan<
	Num1 extends number,
	Num2 extends number,
	CountArr extends unknown[] = []
> = Num1 extends Num2
	? false
	: CountArr["length"] extends Num2
	? true
	: CountArr["length"] extends Num1
	? false
	: GreatThan<Num1, Num2, [...CountArr, unknown]>;

type GreatThanRes = GreatThan<5, 2>;
export {};
