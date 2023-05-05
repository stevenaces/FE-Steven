type MyExclude<T, U> = T extends U ? never : T;

export { MyExclude };
