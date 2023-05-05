import type { Equal, Expect } from "@type-challenges/utils";

import { Push } from "./template";

type cases = [
	Expect<Equal<Push<[], 1>, [1]>>,
	Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
	Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
