import { useMapper, createNamespaceHelpers } from "./useMapper";

export function useState(mapper) {
	let mapFn = mapState;

	// 判断是否是其它模块
	if (typeof moduleName === "string" && moduleName.length > 0) {
		mapFn = createNamespaceHelpers(moduleName).mapState;
	}
	return useMapper(mapper, mapFn);
}
