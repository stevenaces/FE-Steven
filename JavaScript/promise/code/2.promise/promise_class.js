class Promise {
	// 构造方法
	constructor(executor) {
		// 添加属性
		this.PromiseState = 'pending'
		this.PromiseResult = null
		// 声明属性
		this.callbacks = []
		// 保存实例对象的 this 值
		const self = this

		// resolve 函数
		function resolve(data) {
			// 判断状态 确保状态只能修改一次
			if (self.PromiseState !== 'pending') return;
			// 1. 修改对象状态 promiseState
			self.PromiseState = 'fulfilled'     // resolved
			// 2. 设置对象结果值 promiseResult
			self.PromiseResult = data
			// 调用成功的回调函数
			setTimeout(() => {
				self.callbacks.forEach(item => {
					item.onResolved(data)
				})
			})
		}

		// reject 函数
		function reject(data) {
			// 判断状态 确保状态只能修改一次
			if (self.PromiseState !== 'pending') return;
			// 1. 修改对象状态 promiseState
			self.PromiseState = 'rejected'     // rejected
			// 2. 设置对象结果值 promiseResult
			self.PromiseResult = data
			// 调用失败的回调函数
			setTimeout(() => {
				self.callbacks.forEach(item => {
					item.onRejected(data)
				})
			})
		}

		// 同步调用【执行器函数】
		try {
			executor(resolve, reject)
		} catch (e) {
			// 修改 promise 对象状态为【失败】
			reject(e)
		}
	}

	// then 方法
	then(onResolved, onRejected) {
		const self = this
		// 判断回调函数参数
		if (typeof onRejected !== 'function') {
			onRejected = reason => {
				throw reason
			}
		}
		if (typeof onResolved === 'function') {
			onResolved = value => value
		}
		return new Promise((resolve, reject) => {
			// 封装函数
			function callback(type) {
				try {
					// 获取回调函数的执行结果
					let result = type(self.PromiseResult)
					// 判断
					if (result instanceof Promise) {
						// 如果是 Promise 对象
						result.then(v => {
							resolve(v)
						}, r => {
							reject(r)
						})
					} else {
						// 结果的对象状态为 【成功】
						resolve(result)
					}
				} catch (e) {
					reject(e)
				}
			}
			// 调用回调函数
			if (this.PromiseState === 'fulfilled') {
				setTimeout(() => {
					callback(onResolved)
				})
			}
			if (this.PromiseState === 'rejected') {
				setTimeout(() => {
					callback(onRejected)
				})
			}
			// 判断 pending 状态
			if (this.PromiseState === 'pending') {
				// 保存回调函数
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

	// catch 方法
	catch(onRejected) {
		return this.then(undefined, onRejected)
	}

	// resolve 方法
	static resolve(value) {
		// 返回 Promise 对象
		return Promise((resolve, reject) => {
			if (value instanceof Promise) {
				value.then(v => {
					resolve(v)
				}, r => {
					reject(r)
				})
			} else {
				resolve(value)
			}
		})
	}

	// reject 方法
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}

	// all 方法
	static all(promises) {
		// 返回结果为promise对象
		return new Promise((resolve, reject) => {
			let count = 0
			let arr = []

			for (let i = 0; i < promises.length; i++) {
				promises[i].then(v => {
					// 得知对象状态是成功的
					count++
					// 将当前promise对象成功的结果 存入到数组
					arr[i] = v
					// 如果每个 promise 都是成功的
					if (count === promises.length) {
						// 修改状态
						resolve(arr)
					}
				}, r => {
					reject(r)
				})
			}
		})
	}

	// race 方法
	static race(promises) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(v => {
					resolve(v)
				}, r => {
					reject(r)
				})
			}
		})
	}
}