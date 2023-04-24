// 1. 简单类型系统

// 2. 支持泛型的类型系统

// 3. 支持类型编程的类型系统

function getPropValue<T extends object, K extends keyof T>(
	obj: T,
	key: K
): T[K] {
	return obj[key];
}
