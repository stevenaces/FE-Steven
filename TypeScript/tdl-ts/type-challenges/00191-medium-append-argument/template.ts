type AppendArgument<Fn extends Function, A> = Fn extends (
	...args: infer ArgsType
) => infer ReturnType
	? (...args: [...ArgsType, A]) => ReturnType
	: unknown;

export { AppendArgument };
