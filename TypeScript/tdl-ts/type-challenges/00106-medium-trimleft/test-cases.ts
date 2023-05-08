import type { Equal, Expect } from "@type-challenges/utils";

import { TrimLeft } from "./template";

type cases = [
	Expect<Equal<TrimLeft<"str">, "str">>,
	Expect<Equal<TrimLeft<" str">, "str">>,
	Expect<Equal<TrimLeft<"     str">, "str">>,
	Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
	Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
	Expect<Equal<TrimLeft<"">, "">>,
	Expect<Equal<TrimLeft<" \n\t">, "">>
];
