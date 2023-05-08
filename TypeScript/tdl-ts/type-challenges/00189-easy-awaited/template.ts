// type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
//   T extends PromiseLike<infer V>
//     ? V extends PromiseLike<any>
//       ? MyAwaited<V>
//       : V
//     : never

type Thenable<T> = {
	then: (onfulfilled: (arg: T) => unknown) => unknown;
};

type MyAwaited<T extends Thenable<any> | Promise<unknown>> = T extends Promise<
	infer Inner
>
	? Inner extends Promise<unknown>
		? MyAwaited<Inner>
		: Inner
	: T extends Thenable<infer U>
	? U
	: false;

export { MyAwaited };
