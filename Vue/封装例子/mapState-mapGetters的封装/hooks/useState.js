import { useMapper, createNamespaceHelpers } from "./useMapper";

export function useGetters(mapper) {
	let mapFn = mapGetters;

	// 判断是否是其它模块
	if (typeof moduleName === "string" && moduleName.length > 0) {
		mapFn = createNamespaceHelpers(moduleName).mapGetters;
	}
	return useMapper(mapper, mapFn);
}
