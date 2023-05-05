import type { Equal, Expect } from "@type-challenges/utils";

import { Unshift } from "./template";

type cases = [
	Expect<Equal<Unshift<[], 1>, [1]>>,
	Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
	Expect<Equal<Unshift<["1", 2, "3"], boolean>, [boolean, "1", 2, "3"]>>
];
