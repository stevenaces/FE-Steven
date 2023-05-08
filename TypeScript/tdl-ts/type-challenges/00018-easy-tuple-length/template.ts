// 最优
type Length<T extends readonly unknown[]> = T["length"];

// type Length<T> = T extends readonly unknown[] ? T['length'] : never
// type Length<T extends any> = T extends { length : infer R } ? R : never;

export { Length };
