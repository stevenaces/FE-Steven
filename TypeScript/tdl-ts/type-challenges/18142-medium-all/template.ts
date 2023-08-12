import type { Equal } from "@type-challenges/utils";

// my solution 1
// type All<T extends unknown[], Target> =
//   T extends [infer F, ...infer R]
//   ? Equal<F, Target> extends true
//   ? All<R, Target>
//   : false
//   : true

// my solution 2
type All<T extends unknown[], Target, U = T[number]> = Equal<U, Target>

export { All };
