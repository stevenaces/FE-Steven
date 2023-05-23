type AppendToObject<T, U extends keyof any, V> = {
	[K in keyof T | U]: K extends keyof T ? T[K] : V;
};

// keyof any === string | number | symbol
// PropertyKey === string | number | symbol
export { AppendToObject };
