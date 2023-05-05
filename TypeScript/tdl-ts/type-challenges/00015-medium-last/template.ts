type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never;

export { Last };
