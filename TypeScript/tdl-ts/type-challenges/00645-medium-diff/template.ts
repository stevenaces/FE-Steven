/* 方法一：手动判断 */
// type Diff<O, O1> = {
// 	[K in keyof (O & O1) as K extends keyof O
// 		? K extends keyof O1
// 			? never
// 			: K
// 		: K]: K extends keyof (O & O1) ? (O & O1)[K] : never;
// };

// 将上面判断key差集的逻辑封装成一个工具类型
// type DiffKey<O, O1, K = keyof (O & O1)> = K extends keyof O
// 	? K extends keyof O1
// 		? never
// 		: K
// 	: K;

// type Diff<O, O1> = {
// 	[K in DiffKey<O, O1>]: K extends keyof (O & O1) ? (O & O1)[K] : never;
// };

// 同样也可以封装一个key的交集工具类型（但是输入具体类型后不推导，不知道什么原因）
// type SameKey<O, O1, K = keyof (O & O1)> = K extends keyof O
// 	? K extends keyof O1
// 		? K
// 		: never
// 	: never;
// type Diff<O, O1> = Omit<O, SameKey<O, O1>> & Omit<O1, SameKey<O, O1>>;

/* 方法二：对象并集 */
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;
export { Diff };
