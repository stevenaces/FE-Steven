// 声明构造函数
function Promise(executor) {
	// 添加属性
	this.PromiseState = 'pending'
	this.PromiseResult = null
	// 保存回调
	this.callbacks = []
	let self = this

	// resolve 函数
	function resolve(data) {
		// 判断状态
		if (self.PromiseState !== 'pending') return
		// 1.修改对象状态 (promiseState)
		self.PromiseState = 'fulfilled'
		// 2.修改对象结果值 (promiseResult)
		self.PromiseResult = data
		// 执行回调
		setTimeout(() => {
			self.callbacks.forEach(item => {
				item.onResolved(data)
			})
		});
	}
	// reject 函数
	function reject(data) {
		// 判断状态
		if (self.PromiseState !== 'pending') return
		// 1.修改对象状态 (promiseState)
		self.PromiseState = 'rejected'
		// 2.修改对象结果值 (promiseResult)
		self.PromiseResult = data
		// 执行回调
		setTimeout(() => {
			self.callbacks.forEach(item => {
				item.onRejected(data)
			})
		});
	}
	try {
		// 同步调用【执行器函数】
		executor(resolve, reject)
	} catch (e) {
		// 修改 promise 对象为【失败】
		reject(e)
	}
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
	const self = this
	// 判断回调函数参数
	if (typeof onRejected !== 'function') {
			onRejected = reason => {
			throw reason
		}
	}
	if (typeof onResolved !== 'function') {
		onResolved = value => value
	}
	return new Promise((resolve, reject) => {
		// 封装函数
		function callback(type) {
			try {
				// 获取回调函数执行的结果
				let result = type(self.PromiseResult)
				// 判断
				if (result instanceof Promise) {
					// 如果是 Promise 类型的对象
					result.then(v => {
						resolve(v)
					}, r => {
						reject(r)
					})
				} else {
					// 结果的对象状态为【成功】
					resolve(result)
				}
			} catch (e) {
				// 如果抛出错误
				reject(e)
			}
		}
		// 调用回调函数 PromiseState
		if (this.PromiseState === 'fulfilled') {
			setTimeout(() => {
				callback(onResolved)
			});
		}
		if (this.PromiseState === 'rejected') {
			setTimeout(() => {
				callback(onRejected)
			});
		}
		// 异步任务时，保存回调函数
		if (this.PromiseState === 'pending') {
			this.callbacks.push({
				onResolved: function () {
					callback(onResolved)
				},
				onRejected: function () {
					callback(onRejected)
				}
			})
		}
	})
}

// 添加 catch 方法
Promise.prototype.catch = function (onRejected) {
	return this.then(undefined, onRejected)
}

// 添加 resolve 方法
Promise.resolve = function (value) {
	// 返回 Promise 对象
	return new Promise((resolve, reject) => {
		if (value instanceof Promise) {
			value.then(v => {
				resolve(v)
			}, r => {
				reject(r)
			})
		} else {
			// 状态设置为成功
			resolve(value)
		}
	})
}

// 添加 reject 方法
Promise.reject = function (value) {
	return new Promise((resolve, reject) => {
		reject(value)
	})
}

// 添加 all 方法
Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		// 声明计数变量 与 返回值变量
		let count = 0, arr = []
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(v => {
				count++
				// 确保返回的结果顺序不会乱
				arr[i] = v
				if (count === promises.length) {
					resolve(arr)
				}
			}, r => {
				reject(r)
			})
		}
	})
}

// 添加 race 方法
Promise.race = function (promises) {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(v => {
				// 修改返回对象状态为【成功】
				resolve(v)
			}, r => {
				// 修改返回对象状态为【失败】
				reject(v)
			})
		}
	})
}