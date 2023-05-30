// type RemoveIndexSignature<T> = {
// 	[K in keyof T as string extends K
// 		? never
// 		: number extends K
// 		? never
// 		: symbol extends K
// 		? never
// 		: K]: T[K];
// };

type RemoveIndexSignature<T, P = PropertyKey> = {
	[K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
};

export { RemoveIndexSignature };
