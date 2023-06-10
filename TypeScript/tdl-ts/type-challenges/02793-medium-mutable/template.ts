type Mutable<T extends Record<string, any>> = {
	-readonly [P in keyof T]: T[P];
};
export { Mutable };
