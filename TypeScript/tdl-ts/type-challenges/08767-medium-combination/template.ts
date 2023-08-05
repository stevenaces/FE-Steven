type Utils<A extends string, B extends string> = A | B | `${A} ${B}` | `${B} ${A}`

type AllCombination<A extends string, B extends string = A> =
  A extends A
  ? Utils<A, AllCombination<Exclude<B, A>>>
  : never


type Combination<T extends string[]> = AllCombination<T[number]>

export { Combination };
