type OmitByType<T, U> = {
	[K in keyof T as T[K] extends U ? never : K]: T[K];
};

export { OmitByType };
