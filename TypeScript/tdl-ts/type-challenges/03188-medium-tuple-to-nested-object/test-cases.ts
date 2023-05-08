import type { Equal, Expect } from "@type-challenges/utils";

import { TupleToNestedObject } from "./template";

type cases = [
	Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
	Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
	Expect<
		Equal<
			TupleToNestedObject<["a", "b", "c"], boolean>,
			{ a: { b: { c: boolean } } }
		>
	>,
	Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
