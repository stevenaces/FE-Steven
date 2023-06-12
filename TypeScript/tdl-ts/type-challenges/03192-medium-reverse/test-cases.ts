import type { Equal, Expect } from "@type-challenges/utils";

import { Reverse } from "./template";

type cases = [
	Expect<Equal<Reverse<[]>, []>>,
	Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
	Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
];

type errors = [
	// @ts-expect-error
	Reverse<"string">,
	// @ts-expect-error
	Reverse<{ key: "value" }>
];
