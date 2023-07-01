import type { Equal, Expect } from "@type-challenges/utils";

import { Zip } from "./template";

type cases = [
	Expect<Equal<Zip<[], []>, []>>,
	Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
	Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
	Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
	Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];
