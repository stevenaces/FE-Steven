// declare function PromiseAll(values: any): any;

declare function PromiseAll<T extends any[]>(
	value: readonly [...T]
): Promise<{ [K in keyof T]: Awaited<T[K]> }>;

// 这种写法，最后一个案例过不去
// declare function PromiseAll<T extends any[]>(
// 	value: readonly [...T]
// ): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;

export { PromiseAll };
