// type MyOmit<T, K> = any

// 这题需要注意的就是 K 要为 keyof T 的子类型，才能过本题 @ts-expect-error
type MyOmit<T, K extends keyof T> = {
	[P in keyof T as P extends K ? never : P]: T[P];
};

export { MyOmit };
