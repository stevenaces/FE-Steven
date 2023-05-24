import type { Equal, Expect } from "@type-challenges/utils";

import { Merge } from "./template";

type Foo = {
	a: number;
	b: string;
};
type Bar = {
	b: number;
	c: boolean;
};

type cases = [
	Expect<
		Equal<
			Merge<Foo, Bar>,
			{
				a: number;
				b: number;
				c: boolean;
			}
		>
	>
];
