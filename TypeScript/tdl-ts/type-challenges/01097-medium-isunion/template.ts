import type { Equal } from "@type-challenges/utils";

type IsUnion<A, B = A> = Equal<A, never> extends true
	? false
	: A extends B
	? [B] extends [A]
		? false
		: true
	: never;

export { IsUnion };
