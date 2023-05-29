import type { Equal, Expect } from "@type-challenges/utils";

import { IsNever } from "./template";

type cases = [
	Expect<Equal<IsNever<never>, true>>,
	Expect<Equal<IsNever<never | string>, false>>,
	Expect<Equal<IsNever<"">, false>>,
	Expect<Equal<IsNever<undefined>, false>>,
	Expect<Equal<IsNever<null>, false>>,
	Expect<Equal<IsNever<[]>, false>>,
	Expect<Equal<IsNever<{}>, false>>
];
