type PickByType<T, U> = {
	[K in keyof T as T[K] extends U ? K : never]: U;
};

export { PickByType };
