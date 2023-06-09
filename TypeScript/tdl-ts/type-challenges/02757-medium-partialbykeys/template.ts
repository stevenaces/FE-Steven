// 需要写一个工具类显式计算一下
type IntersectionObj<T> = {
	[P in keyof T]: T[P];
};

// 或者使用Omit<T, never>

/* 第一种 */
type PartialByKeys<T, K extends keyof T = keyof T> = IntersectionObj<
	{
		[P in Exclude<keyof T, K>]: T[P];
	} & {
		[P in K]+?: T[P];
	}
>;

/* 第二种 */
// type PartialByKeys<T, K extends keyof T = keyof T> = Omit<
// 	{
// 		[P in Exclude<keyof T, K>]: T[P];
// 	} & {
// 		[P in K]+?: T[P];
// 	},
// 	never
// >;

export { PartialByKeys };
