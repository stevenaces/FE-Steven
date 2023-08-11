// 我怎么就想不到每个类型都会被封装呢？然后对象身上有 .valueOf 方法，这个方法可以返回类型呢？

type ToPrimitive<T> =
  T extends object
  ? T extends (...args: any[]) => unknown
  ? Function
  : {
    [K in keyof T]: ToPrimitive<T[K]>
  }
  : T extends { valueOf: () => infer P }
  ? P
  : T

export { ToPrimitive };
