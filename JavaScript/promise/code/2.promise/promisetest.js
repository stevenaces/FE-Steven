function Promise(executor) {
	this.PromiseStatus = "pending";
	this.PromiseResult = null;

	this.callbacks = [];

	let self = this;

	function resolve(data) {
		if (self.PromiseStatus !== "pending") return;
		self.PromiseStatus = "fulfilled";
		self.PromiseResult = data;

		setTimeout(() => {
			self.callbacks.forEach((item) => {
				item.onResolve(data);
			});
		});
	}

	function reject(err) {
		if (self.PromiseStatus !== "pending") return;
		self.PromiseStatus = "rejected";
		self.PromiseResult = err;

		setTimeout(() => {
			self.callbacks.forEach((item) => {
				item.onRejected(err);
			});
		});
	}

	try {
		executor(resolve, reject);
	} catch (error) {
		reject(error);
	}
}

Promise.prototype.then = function (onResolve, onRejected) {
	if (typeof onResolve !== "function") {
		onResolve = (value) => value;
	}
	if (typeof onRejected !== "function") {
		onRejected = (err) => {
			throw err;
		};
	}
	let self = this;
	return new Promise((resolve, reject) => {
		function callback(type) {
			try {
				const result = type(self.PromiseResult);
				if (result instanceof Promise) {
					result.then(
						(v) => {
							resolve(v);
						},
						(e) => {
							reject(e);
						}
					);
				} else {
					resolve(result);
				}
			} catch (error) {
				reject(error);
			}
		}
		if (self.PromiseStatus === "fulfilled") {
			setTimeout(() => {
				callback(onResolve);
			});
		}
		if (self.PromiseState === "rejected") {
			setTimeout(() => {
				callback(onRejected);
			});
		}
		if (self.PromiseState === "pending") {
			self.callbacks.push({
				onResolve: function () {
					callback(onResolve);
				},
				onRejected: function () {
					callback(onRejected);
				},
			});
		}
	});
};

Promise.prototype.catch = function (onRejected) {
	return this.then(undefined, onRejected);
};

Promise.resolve = function (value) {
	return new Promise((resolve, rejected) => {
		if (value instanceof Promise) {
			value.then(
				(v) => {
					resolve(v);
				},
				(e) => {
					rejected(e);
				}
			);
		} else {
			resolve(value);
		}
	});
};

Promise.reject = function (value) {
	return new Promise((resolve, reject) => {
		reject(value);
	});
};

Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		let res = [];
		let count = 0;
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(
				(v) => {
					res[i] = v;
					count += 1;
					if (count === promises.length) {
						resolve(res);
					}
				},
				(e) => {
					reject(e);
				}
			);
		}
	});
};

Promise.race = function (promises) {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(
				(v) => {
					resolve(v);
				},
				(e) => {
					reject(e);
				}
			);
		}
	});
};

function task() {
	let num = Math.random();
	return new Promise((resolve, reject) => {
		if (num > 0.4) {
			resolve(num);
		} else {
			reject(num);
		}
	});
}

Promise.retry = function (fn, times) {
	return new Promise(async (resolve, reject) => {
		let tryTimes = 1;
		while (tryTimes <= times) {
			try {
				const res = await fn();
				console.log(`第 ${tryTimes} 尝试成功，结果为 ${res}`);
				resolve(res);
			} catch (e) {
				console.log(`第 ${tryTimes} 尝试失败，结果为 ${res}`);
				if (tryTimes === times) {
					console.log(`${tryTimes}次尝试都失败了！`);
					reject(e);
				}
			}
			tryTimes++;
		}
	}).catch((e) => {
		console.log(`任务失败了！原因是${e}`);
	});
};
