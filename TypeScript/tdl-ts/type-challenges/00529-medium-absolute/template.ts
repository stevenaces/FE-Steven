type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`
	? U
	: `${T}`;
export { Absolute };
