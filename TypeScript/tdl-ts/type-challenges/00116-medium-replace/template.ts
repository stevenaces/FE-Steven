type Replace<
	S extends string,
	From extends string,
	To extends string
> = From extends ""
	? S
	: S extends `${infer Head}${From}${infer Tail}`
	? `${Head}${To}${Tail}`
	: S;
export { Replace };
