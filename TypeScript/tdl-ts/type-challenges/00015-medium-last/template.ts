// type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never;

type Last<T extends any[]> = [unknown, ...T][T["length"]];

export { Last };
