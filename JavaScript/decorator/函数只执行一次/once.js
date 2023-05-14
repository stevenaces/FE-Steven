function once(fn) {
	const fnName = fn.name;
	return function (...args) {
		if (fn) {
			const ret = fn.apply(null, args);
			fn = null;
			return ret;
		} else {
			console.log(`${fnName} 函数已近执行过一次了！所以不会再执行了。`);
		}
	};
}

function sum(a, b) {
	return a + b;
}

const onceSum = once(sum);
console.log(onceSum(1, 2));
console.log(onceSum(1, 2));
