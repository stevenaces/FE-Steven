// type MyCapitalize<S extends string> = S extends `${infer F}${infer R}`
// 	? `${Uppercase<F>}${R}`
// 	: S;

// 社区另一个非常棒的回答
interface ToUpperCase {
	a: "A";
	b: "B";
	c: "C";
	d: "D";
	e: "E";
	f: "F";
	g: "G";
	h: "H";
	i: "I";
	j: "J";
	k: "K";
	l: "L";
	m: "M";
	n: "N";
	o: "O";
	p: "P";
	q: "Q";
	r: "R";
	s: "S";
	t: "T";
	u: "U";
	v: "V";
	w: "W";
	x: "X";
	y: "Y";
	z: "Z";
}

type LowCase = keyof ToUpperCase;

type MyCapitalize<S extends string> =
	S extends `${infer F extends LowCase}${infer R}`
		? `${ToUpperCase[F]}${R}`
		: S;

export { MyCapitalize };
