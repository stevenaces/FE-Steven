type Pop<T extends any[]> = T extends []
	? []
	: T extends [...infer R, infer L]
	? R
	: never;
export { Pop };
