type ReplaceKeys<U, T, Y> = U extends U
	? {
			[P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
	  }
	: never;

// 这样也可以，只是想不通为啥不需要触发 联合类型的分布式条件
// type ReplaceKeys<U, T, Y> = {
// 	[K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
// };

export { ReplaceKeys };
