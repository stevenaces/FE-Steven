/**
 *	防抖：规定时间后再执行（触发）指定函数。
 *  应用场景：搜索框远程搜索，用户在持续输入的时候不触发，当用户暂停输入时间超过wait时，触发远程搜索
 * @param {*} fn 加防抖效果的函数
 * @param {*} wait 时间
 * @returns 具有防抖功能的函数
 */

function debounce(fn, wait) {
	let timer = null;
	return function (...args) {
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, wait);
	};
}
