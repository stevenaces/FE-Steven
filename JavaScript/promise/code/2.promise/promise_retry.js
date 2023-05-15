/**
 * 实现 Promise.retry, 重试异步函数
 * 异步函数执行成功后 resolve 结果
 * 失败后重试，尝试超过一定次数才真正 reject
 */
// 1. 异步函数 Promise 和 setTimeout
// 2. Promise.retry 重试 Promise
function fn() {
	const n = Math.random();
	return new Promise((resolve, reject) => {
		if (n > 0.7) {
			resolve(n);
		} else {
			reject(n);
		}
	});
}

Promise.prototype.retry = (task, times) => {
	new Promise(async (resolve, reject) => {
		while (times--) {
			try {
				const result = await task();
				console.log("执行成功，得到的结果是：", result);
				resolve(result);
				break;
			} catch (error) {
				console.log("执行失败一次，结果是：", error);
				if (!times) {
					reject(error);
				}
			}
		}
	}).catch(() => {
		console.log("全部次数尝试完成，仍然失败。");
	});
};

// Promise.prototype.retry(fn, 3);

Promise.prototype.retryFn = (task, times = 3) => {
	new Promise(async (resolve, reject) => {
		let count = 0;
		while (times--) {
			try {
				const result = await task();
				console.log(`${++count} 次执行成功，执行结果${result}`);
				resolve(result);
				break;
			} catch (error) {
				console.log(`${++count} 次执行失败，执行结果${error}`);
				if (!times) {
					reject(error);
				}
			}
		}
	}).catch(() => {
		console.log("全部次数尝试完成，仍然失败。");
	});
};

Promise.prototype.retryFn(fn, 3);
