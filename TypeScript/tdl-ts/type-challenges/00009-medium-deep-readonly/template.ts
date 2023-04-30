// type DeepReadonly<T> = {
// 	readonly [K in keyof T]: T[K] extends object
// 		? T[K] extends Function
// 			? T[K]
// 			: DeepReadonly<T[K]>
// 		: T[K];
// };

// 下面这种会立即触发深层对象的 readonly 计算；上面这种写法ts为了性能，不会触发深层次的计算，但是两者的实际效果是一样的
type DeepReadonly<T> = T extends any
	? {
			readonly [K in keyof T]: T[K] extends Record<string, any>
				? T[K] extends Function
					? T[K]
					: DeepReadonly<T[K]>
				: T[K];
	  }
	: never;

export { DeepReadonly };
