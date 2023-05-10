import type { Equal, Expect } from "@type-challenges/utils";

import { Replace } from "./template";

type cases = [
	Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
	Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
	Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
	Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
	Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
	Expect<Equal<Replace<"", "", "">, "">>
];
