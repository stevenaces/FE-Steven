import type { Equal, Expect } from "@type-challenges/utils";

import { EndsWith } from "./template";

type cases = [
	Expect<Equal<EndsWith<"abc", "bc">, true>>,
	Expect<Equal<EndsWith<"abc", "abc">, true>>,
	Expect<Equal<EndsWith<"abc", "d">, false>>,
	Expect<Equal<EndsWith<"abc", "ac">, false>>,
	Expect<Equal<EndsWith<"abc", "">, true>>,
	Expect<Equal<EndsWith<"abc", " ">, false>>
];
