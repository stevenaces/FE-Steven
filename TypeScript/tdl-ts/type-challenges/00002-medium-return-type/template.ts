type MyReturnType<T extends Function> = T extends (...args: any) => infer R
	? R
	: never;

// 这种写法，函数参数类型必须是any，不能是unknown，与逆变有关
// type MyReturnType<T extends (...args: any) => unknown> = T extends (
// 	...args: any
// ) => infer R
// 	? R
// 	: never;

export { MyReturnType };
