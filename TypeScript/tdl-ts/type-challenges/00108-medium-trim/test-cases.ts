import type { Equal, Expect } from "@type-challenges/utils";

import { Trim } from "./template";

type cases = [
	Expect<Equal<Trim<"str">, "str">>,
	Expect<Equal<Trim<" str">, "str">>,
	Expect<Equal<Trim<"     str">, "str">>,
	Expect<Equal<Trim<"str   ">, "str">>,
	Expect<Equal<Trim<"     str     ">, "str">>,
	Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
	Expect<Equal<Trim<"">, "">>,
	Expect<Equal<Trim<" \n\t ">, "">>
];
