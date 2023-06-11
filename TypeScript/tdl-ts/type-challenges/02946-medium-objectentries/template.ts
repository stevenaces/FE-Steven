type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>;

// 如果是可选属性，则判断是否要删除undefined类型
// 最后通过[keyof T]获取对象联合类型之后，还需要删除一次undefined 类型
type ObjectEntries<T> = RemoveUndefined<
	{
		[K in keyof T]: {} extends Pick<T, K>
			? [K, RemoveUndefined<T[K]>]
			: [K, T[K]];
	}[keyof T]
>;

export { ObjectEntries };
