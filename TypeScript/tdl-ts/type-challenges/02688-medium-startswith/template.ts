type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
	? true
	: false;

export { StartsWith };
