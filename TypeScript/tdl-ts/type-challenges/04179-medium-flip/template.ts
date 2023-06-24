type Flip<T extends Record<string, string | number | boolean>> = {
	[K in keyof T as `${T[K]}`]: K;
};

export { Flip };
