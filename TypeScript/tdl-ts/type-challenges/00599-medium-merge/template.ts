type Merge<F, S> = {
	[P in keyof F | keyof S]: P extends keyof S
		? S[P]
		: P extends keyof F
		? F[P]
		: never;
};

// type Merge<F, S> = {
// 	[P in keyof (F & S)]: P extends keyof S ? S[P] : (F & S)[P];
// };

// type Merge<F, S> = Omit<F, keyof S> & S

export { Merge };
