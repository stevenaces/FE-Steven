// my solution
// 实际就是实现一个双重循环
// type InnerLoop<E extends string, U extends string> = U extends U ? `${E} ${U}` : never

// type Combs<T extends string[]> =
//   T extends [infer F extends string, ...infer R extends string[]]
//   ? InnerLoop<F, R[number]> | Combs<R>
//   : never

// optimal
type Combs<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]] ? `${F} ${R[number]}` | Combs<R> : never;

export { Combs };
