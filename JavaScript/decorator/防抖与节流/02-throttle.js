/**
 *  节流：wait时间为一个周期，周期内只执行一次指定函数的效果。
 *  应用：提交、抢单按钮，无论用户一个周期内电机多少次，在这个周期里只执行一次
 * @param {*} fn 加节流的函数
 * @param {*} wait 节流周期
 * @returns 加了节流功能的函数
 */
function throttle(fn, wait) {
	let timer = null;
	return function (...args) {
		if (!timer) {
			const ret = fn.apply(this, args);
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			return ret;
		}
	};
}
