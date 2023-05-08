import type { Equal, Expect, NotAny } from "@type-challenges/utils";
import { HelloWorld } from "./template";
type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>];
