import { Equal } from "@type-challenges/utils";

// 根据never特性，如果在条件判断左边，直接返回never
type resType<T> = T extends never ? 1 : 2;
type res = resType<never>; // res 类型是 never，而不是 1，也不是 2

// type IsNever<T> = [T] extends [never] ? true : false;

// 获取直接使用工具类型Equal
type IsNever<T> = Equal<T, never>;

export { IsNever };
