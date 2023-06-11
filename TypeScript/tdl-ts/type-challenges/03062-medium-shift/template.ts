// graceful solution
type Shift<T extends any[]> = T extends [any, ...infer R] ? R : [];

// My solution
// type Shift<T extends any[]> = T extends []
// 	? []
// 	: T extends [infer F, ...infer R]
// 	? R
// 	: never;

export { Shift };
