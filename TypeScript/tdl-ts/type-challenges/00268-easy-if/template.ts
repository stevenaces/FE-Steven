type If<C extends boolean, T, F> = C extends true ? T : F;
export { If };
