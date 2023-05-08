// type LookUp<U, T> = U extends {type: T} ? U : never

// type LookUp<U extends { type: string }, T> = U extends U
// 	? U["type"] extends T
// 		? U
// 		: never
// 	: never;

type LookUp<U, T extends string> = {
	[P in T]: U extends { type: T } ? U : never;
}[T];

export { LookUp };
