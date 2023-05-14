function sum(...list) {
	return list.reduce((a, b) => a + b, 0);
}

// 只有sum参数长度 >= 3，才执行 sum
// 只有sum结果 >= 10，才返回 sum结果值
function help(fn, { before = null, after = null }) {
	return function (...args) {
		return function (...args) {
			if (!beforeCall || beforeCall.call(this, args) !== false) {
				const ret = fn.apply(this, args);
				if (afterCall) return afterCall.call(this, ret);
				return ret;
			}
		};
	};
}

function sum(...list) {
	return list.reduce((a, b) => a + b);
}

sum = interceptor(sum, {
	beforeCall(args) {
		console.log(`The argument is ${args}`);
		console.time("sum"); // 监控性能
	},
	afterCall(ret) {
		console.log(`The result is ${ret}`);
		console.timeEnd("sum");
	},
});

sum(1, 2, 3, 4);
