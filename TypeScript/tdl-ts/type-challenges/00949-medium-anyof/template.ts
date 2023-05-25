type Falsely =
	| 0
	| ""
	| false
	| undefined
	| null
	| []
	| { [key: string]: never }; // Record<string, never>

type AnyOf<T extends readonly any[]> = T[number] extends Falsely ? false : true;

export { AnyOf };
