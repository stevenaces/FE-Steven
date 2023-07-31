type Blank = ' ' | '\t' | '\n'

type TrimRight<S extends string> = S extends `${infer F}${Blank}` ? TrimRight<F> : S

export { TrimRight };
