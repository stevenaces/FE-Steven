import { computed } from "vue";
import { useStore, mapState, mapGetters } from "vuex";

/* 抽离核心逻辑 */
export function useMapper(mapper, mapFn) {
	// 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeDateFns = mapFn(mapper);

	// 对数据进行转换
	const storeDate = {};
	Object.keys(storeDateFns).forEach((fnKey) => {
		const fn = storeDateFns[fnKey].bind({ $store: store });
		storeDate[fnKey] = computed(fn);
	});

	return storeDate;
}
