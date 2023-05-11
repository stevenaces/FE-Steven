type Permutation<T, K = T> = [T] extends [never]
	? []
	: T extends K
	? [T, ...Permutation<Exclude<K, T>>]
	: never;

export { Permutation };
