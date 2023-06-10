// type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<
// 	{
// 		[P in Exclude<keyof T, K>]?: T[P];
// 	} & {
// 		[P in K]-?: T[P];
// 	},
// 	never
// >;

// 一个组合使用内置工具类的好例子
type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<
	T & Required<Pick<T, K & keyof T>>,
	never
>;

export { RequiredByKeys };
