# Promise 

> 笔记摘自 [此视频合集](https://www.bilibili.com/video/BV1GA411x7z1?spm_id_from=333.999.0.0)

>测试一下几个问题，查看自己对`Promise`的理解：
>
>1. 执行器函数`executor`是同步执行还是异步执行？
>2. 通过`then`**指定回调函数**，与**指定回调函数的执行**时机？
>3. promise **改变状态** 与 **指定回调函数** 孰先孰后？
>4. `promise.then()`的返回结果是promise，这个promise的**状态与结果**怎么确定？
>5. promise如何串联多个异步任务？
>6. promise中的**异常穿透**？
>7. 如何**中断promise链**？

## 基本使用和概念

### 1.Promise体验

1. 常见的`异步操作`：

- fs读写文件
- 数据库操作
- ajax

- 定时器操作

2. Promise是什么？特点及作用

​	Promise本质来说是一个构造函数，支持链式调用，能解决回调地狱的问题，在指定回调方式的时候更加灵活。

3. Promise 基本语法

```javascript
const p = new Promise(resolve, reject){
    // 编写需要执行的异步任务代码
    if(成功){
        resolve(params)
    }else{
        reject(params)
    }
}

p.then((value) => {
	// 异步任务执行成功的后续动作    
}, (reason) => {
    // 异步任务失败的后续动作
})
```

4. Ajax 基本语法

```javascript
// 1.创建对象
const xhr = new XMLHttpRequest()
// 2.初始化
xhr.open('GET', url)
// 3.发送
xhr.send()
// 4.处理响应
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.response)
        }else{
            console.log(xhr.status)
        }
    }
}
```

5. 封装一个读取文件的函数

```javascript
function myReadFile(path){
    return new Promise(resolve, reject){
        require('fs').readFile(path, (err, data) => {
            if(err) reject(err);
            resolve(data)
        })
    }
}

myReadFile(path).then(value => {
    console.log(value)
}, reason => {
    console.warn(reason)
})
```

6. util.promisify

只要传入一个遵循错误优先的回调函数，则可以返回一个promise风格的函数给你。

```javascript
// 引入
const util = require('util')
const fs = require('fs')
// 返回一个新函数
let myReadFile = util.promisify(fs.readFile)

myReadFile(path).then(value => {}, reason => {})
```

### 2.Promise理论

1. promise状态
2. Promise结果

3. promise工作流程

4. API

```javascript
Promise(excutor) // excutor是执行器，执行器是同步调用，异步任务是进入执行器中执行

const p = new Promise((resolve, reject) => {
    // 执行器函数，此处的代码会同步调用，不会进入队列
    console.log('111')
})
console.log('222')

// 上述输出
111
222
```

- Promise.prototype.then(value, reason)

- Promise.prototype.catch(reason)

- Promise.resolve()

    如果传入的是非Promise对象，则返回为成功状态的Promise；

    如果传入的是Promise对象，则**返回状态**为传入Promise对象的状态，**返回结果**为传入Promise的处理的结果

- Promise.reject()

    不管传入什么，返回的状态都是失败的状态，返回的结果就是失败的结果

- Promise.all([])

    只有传入的所有Promise对象返回状态为成功，返回的状态才为成功，否则返回状态为失败，且返回结果为状态失败的那个Promise对象结果

- Promise.trace([])

    返回的状态为最先完成的那个Promise对象返回状态，返回结果也是这个最先返回的Promise对象结果

### 3.Promise几个问题

1. 如何改变Promise状态？

    使用`resolve()`将Promise状态由 pendding -> fullfilled；

    使用`reject() 或 throw `将Promise状态由 pendding->rejected;

2. 一个Promise指定（可通过`then, catch`来指定）多个成功/失败的回调函数，都会调用吗？

    当Promise改变为对应状态时，**都会调用**。

3. 改变 Promise状态和指定回调函数谁先谁后？

    > 这里先区分几个概念：
    >
    > 1. Promise(excutor)：执行器(excutor)里的任务是**异步任务**还是**同步任务**；
    >
    > 2. 指定回调函数执行时机：就是通过`then, catch`方法指定回调函数，`then, catch`执行时机；
    >
    > 3. 指定的回调函数执行时机：就是通过`then, catch`方法指定**的**回调函数执行时机。

​			都有可能，如果执行器里的任务是同步任务，则先改变状态，再指定回调，如果执行器里的任务是异步任务，则先指定回调，再改变状态。

​			3.1 如何先改变状态，再指定回调？

​					在执行器里直接执行`resolve(), reject(), 延时调用then `

​			3.2 什么时候才能得到数据？

​					还是看执行器里的任务，如果是**同步任务**，这在**指定回调函数时**就能得到数据，如果是**异步任务**，则在**指定的回调函数执行时**就能得到数据。

4. promise.then() 返回的**新promise**的结果状态由什么决定？

    简单表述：由then() 指定的回调函数执行的结果决定。

    详细表述：以下几种情况打印的result**状态**和**结果**分别是什么？

    ```javascript
    let p = new Promise((resolve, reject) => {
        resolve('ok')
    })
    
    // 执行 then 方法
    let result = p.then(value => {
        // 0. 无返回
        // console.log(value)
        
        // 1. 抛出错误
        // throw '出错了'
    
        // 2. 返回结果是非 Promise 类型对象
        // return 521;
    
        // 3. 返回结果是 Promise 对象
        /*
        return new Promise((resolve, reject) => {
            resolve('success')
            // reject('error')
        })*/    
    }, reason => {
        console.warn(reason)
    })
    
    console.log(result)
    // 		1.			2.			3.			0.
    status  rejected	fulfilled	fulfilled	fulfilled
    result	出错了			521			success	  undefined
    // 可再想想，如果这几种情况出现在 失败的回调，结果咋样？结果同上。
    ```

5. promise如何串联多个操作任务？

    - promise的then返回一个新的promise，可以写成then的链式调用；
    - 通过then的链式调用来串联多个同步/异步任务。

    ```javascript
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('err')    
        }, 1000);
    })
    
    // 执行 then 方法
    p.then(value => {
        return new Promise((resolve, reject) => {
            resolve("success")
        })
    }).then(value => {
        console.log(value)  // success fulfilled
    }).then(value => {
        console.log(value)  // undefined fulfilled
    })
    ```

6. promise中的异常穿透

    - 但使用then链式调用时，可以只在最后通过`.catch`指定失败的回调；
    - 前面任何操作出现了异常，都会立即传到最后失败的回调中处理。

    ```javascript
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
            // reject('err')    
        }, 1000);
    })
    
    // 执行 then 方法
    p.then(value => {
        console.log(value)
        console.log(111)
    }).then(value => {
        console.log(222)
        // throw '出错了'
    }).then(value => {
        console.log(333)
        return new Promise((resolve, reject) => {
            reject('Err')
        })
    }).catch(reason => {
        console.warn(reason)
    })
    ```

7. 如何中断promise链

    - 当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数；
    - 办法：在回调函数中返回一个pendding状态的promise对象。

    ```javascript
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
            // reject('err')    
        }, 1000);
    })
    
    // 执行 then 方法
    p.then(value => {
        console.log(value)
        console.log(111)
        // throw '出错了'
    }).then(value => {
        console.log(222)
        return new Promise(() => {})	//pendding 状态的promise对象
    }).then(value => {
        console.log(333)
    }).catch(reason => {
        console.warn(reason)
    })
    ```

## 自定义（手写）Promise

### 1. 初始化

```javascript
// 声明构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    let self = this

    // resolve 函数
    function resolve(data) {
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'fulfilled'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
    }
    // reject 函数
    function reject(data) {
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'rejected'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
    }

    // 同步调用 【执行器函数】
    executor(resolve, reject)
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {

}
```

### 2. throw 抛出异常处理

throw异常是在executor里执行的，所以需要在executor执行处的外边`try...catch`捕获

```javascript
// 声明构造函数
function Promise(executor) {
    ...
    try{
        // 同步调用【执行器函数】
        executor(resolve, reject)
    }catch(e) {
        // 修改 promise 对象为【失败】
        reject(e)
    }
}
```

### 3. 状态只能修改一次

如果同时写了resolve与reject，最后的promise状态由哪一个先调用决定

```javascript
// 声明构造函数
function Promise(executor) {
    ...
    // resolve 函数
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return	// 【关键】
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'fulfilled'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
    }
    // reject 函数
    function reject(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return	// 【关键】
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'rejected'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
    }
    ...
}  
```

### 4. then方法执行回调

判断状态，同步任务，执行不同的回调，并且将promise的结果传出去。

```javascript
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数 PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult)
    }
    if(this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult)
    }
}
```

### 5. 异步任务then方法执行回调

当执行器里是异步任务时，promise状态还未改变，不能立即执行对应回调，此时，应该保存好回调函数，回调函数执行的时机应该在resolve或reject中。

```javascript
// 声明构造函数
function Promise(executor) {
    ...
    // 保存回调【第一步】
    this.callback = {}
    let self = this

    // resolve 函数
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'fulfilled'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调【第三步】
        if(self.callback.onResolved) {
            onResolved(data)
        }
    }
    // reject 函数
    function reject(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'rejected'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调【第三步】
        if(self.callback.onRejected) {
            onResolved(data)
        }
    }
    ...
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数 PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult)
    }
    if(this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult)
    }
    // 异步任务时，保存回调函数【第二步】
    if(this.PromiseState === 'pending') {
        this.callback = {
            onResolved,
            onRejected
        }
    }
}
```

### 6.指定多个回调

Promise实例化对象后，可能在该对象上使用`then`指定多个回调，为了使这些回调都执行怎么办呢？

也很简单的，就是将保存回调的变量改为数组，然后遇到指定的回调，就push进去，然后再在执行回调的时候，遍历执行就行。

```javascript
// 声明构造函数
function Promise(executor) {
    ...
    // 保存回调
    this.callbacks = []						// 【第一步】
    let self = this

    // resolve 函数
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'fulfilled'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调
        self.callbacks.forEach(item => {	// 【第三步】
            item.onResolved(data)
        })
    }
    // reject 函数
    function reject(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'rejected'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调
        self.callbacks.forEach(item => {	// 【第三步】
            item.onRejected(data)
        })
    }
    ...
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
    ...
    // 异步任务时，保存回调函数
    if(this.PromiseState === 'pending') {
        this.callbacks.push({				// 【第二步】
            onResolved,
            onRejected
        })
    }
}
```

### 7. 同步任务then返回的结果

这点主要实现上述Promise几个问题中的第四点。

```javascript
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
	let self = this
	return new Promise((resolve, reject) => {			
		// 调用回调函数 PromiseState
		if(this.PromiseState === 'fulfilled'){
			try {
				// 获取回调函数执行的结果
				let result = onResolved(this.PromiseResult)
				// 判断
				if(result instanceof Promise) {
                    // 如果是 Promise 类型的对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
				}else{
                    // 结果的对象状态为【成功】
                    reject(result)
				}
			}catch (e) {  
                // 如果抛出错误
                reject(e)
			}
		}
		if(this.PromiseState === 'rejected') {
			try {
				// 获取回调函数执行的结果
				let result = onRejected(this.PromiseResult)
				// 判断
				if(result instanceof Promise) {
                    // 如果是 Promise 类型的对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
				}else{
                    // 结果的对象状态为【成功】
                    reject(result)
				}
			}catch (e) {  
                // 如果抛出错误
                reject(e)
			}
		}
		// 异步任务时，保存回调函数
		if(this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved,
                onRejected
            })
		}
	})    
}
```

### 8.异步任务then的返回值

```javascript
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
	let self = this
	return new Promise((resolve, reject) => {			
		// 调用回调函数 PromiseState
		if(this.PromiseState === 'fulfilled'){
			...
		}
		if(this.PromiseState === 'rejected') {
			...
		}
		// 异步任务时，保存回调函数
		if(this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved: function() {
                    try {
                        // 接收回调函数的返回值
                        let result = onResolved(self.PromiseResult)
                        if(result instanceof Promise){
                            result.then(v => {
                                resolve(v)
                            }, r => {
                                reject(r)
                            })
                        }else{
                            reject(result)
                        }
                    } catch (e) {
                        reject(e)
                    }
                },
                onRejected: function() {
                    try {
                        // 接收回调函数的返回值
                        let result = onRejected(self.PromiseResult)
                        if(result instanceof Promise){
                            result.then(v => {
                                resolve(v)
                            }, r => {
                                reject(r)
                            })
                        }else{
                            reject(result)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
            })
		}
	})    
}
```

### 9. then方法完善

封装的then函数里面，对于同步任务和异步任务的回调函数执行，最后判断then的返回结果情况，用了四次几乎相同的`tyr...catch`代码，所以可以进行封装。

```javascript
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
	const self = this
	return new Promise((resolve, reject) => {
		// 封装函数
		function callback(type) {				// 【封装部分】
			try {
				// 获取回调函数执行的结果
				let result = type(self.PromiseResult)
				// 判断
				if(result instanceof Promise) {
                    // 如果是 Promise 类型的对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
				}else{
                    // 结果的对象状态为【成功】
                    resolve(result)
				}
			}catch (e) {  
                // 如果抛出错误
                reject(e)
			}
		}
		// 调用回调函数 PromiseState
		if(this.PromiseState === 'fulfilled'){
			callback(onResolved)				// 【调用】
		}
		if(this.PromiseState === 'rejected') {
			callback(onRejected)				// 【调用】
		}
		// 异步任务时，保存回调函数
		if(this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved: function() {
                    callback(onResolved)		// 【调用】
                },
                onRejected: function() {
                    callback(onRejected)		// 【调用】
                }
            })
		}
	})    
}
```

### 10.catch方法 与 异常穿透

- 添加`catch()`方法

    ```javascript
    // catch 方法实现
    // 添加 catch 方法
    Promise.prototype.catch = function(onRejected) {
        // 因为已经对 then 有了很好的实现了，所以直接将catch的回调函数传入即可
    	return this.then(undefined, onRejected)
    }
    
    // catch用法
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('ok')
            reject('Err')
        }, 100);
        // resolve('ok')
        // reject('Err')
    })
    
    let res = p.catch(reason => {
        console.warn(reason)
    })
    console.log(res)
    ```

- 异常穿透

    指的是在使用`then()`的链式调用的时候，链中没有指定异常的回调，而某一链抛出了错误，仍然可以在最后使用`catch`接住并处理这个异常，问题场景如下：

    ```javascript
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Err')
        }, 100);
    })
    
    p.then(value => {
        console.log('111')
    }).then(value => {
        console.log('222')
    }).then(value => {
        console.log('333')
    }).catch(reason => {
        console.warn(reason)
    })
    ```
    

**处理办法：**此时用户并没有为promise实例调用then后指定失败的回调，那就需要在为Promise定义的`then()`方法里判断这种情况，并为其补充上这个回调：
    

```javascript
    // 添加 then 方法
    Promise.prototype.then = function(onResolved, onRejected) {
    	const self = this
    	// 判断回调函数参数
    	if(typeof onRejected !== 'function'){
    		onRejected = reason => {
    			throw reason
    		}
    	}
    	...
    }
```

此外，如果promise实例链式调用的时候，如果某一链`then()`中成功的回调也没传，也应该判断并为其补充上这个回调，先看场景：
    
```javascript
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 100);
    })
    
    p.then()			// 此处成功和失败的回调都没有传
    .then(value => {
        console.log('222')
    }).then(value => {
        console.log('333')
    }).catch(reason => {
        console.warn(reason)
    })
    console.log(res)
```

**处理办法：**
    

```javascript
    // 添加 then 方法
    Promise.prototype.then = function(onResolved, onRejected) {
    	const self = this
    	// 判断回调函数参数
    	if(typeof onRejected !== 'function'){
    		onRejected = reason => {
    			throw reason
    		}
    	}
    	if(typeof onResolved !== 'function'){
    		onResolved = value => value
    	}
        ...
    }
```

> 此处的`异常穿透处理`看似挺简单的，但需要想清楚里面的`异常`是如何抛的（或者说是传递的），以及在`then()`中为什么要判断`回调函数参数`。

### 11.Promise.resolve封装

当使用`Promise.resolve(value)`创建一个promise实例对象的时候，要能根据传入的value，返回对应的promise，这点与Promise几个问题中的第四点一样。应用场景：

```javascript
let p1 = new Promise.resolve('ok')
let p2 = new Promise.resolve(new Promise((resolve, reject) => {
    resolve('success')
}))
console.log(p1)
console.log(p2)
```

代码实现：

```javascript
// 添加 resolve 方法
Promise.resolve = function(value) {
	// 返回 Promise 对象
	return new Promise((resolve, reject) => {
		if(value instanceof Promise) {
			value.then(v => {
				resolve(v)
			}, r => {
				reject(r)
			})
		}else {
			// 状态设置为成功
			resolve(value)
		}
	})
}
```

> 个人理解是否还应加上`try...catch`？

### 12.Promise.reject封装

同上述resolve封装类似，只不过返回的promise实例对象永远是一个失败的promise，封装如下：

```javascript
// 添加 reject 方法
Promise.reject = function(value) {
	return new Promise((resolve, reject) => {
		reject(value)
	})
} 
```

### 13.Promise.all封装

```javascript
// 添加 all 方法
Promise.all = function(promises) {
	return new Promise((resolve, reject) => {
		// 声明计数变量 与 返回值变量
		let count = 0, arr = []
		for(let i=0; i<promises.lenght; i++){
			promises[i].then(v => {
				count++
				// 确保返回的结果顺序不会乱
				arr[i] = v
				if(count === promises.lenght){
					resolve(arr)
				}
			}, r => {
				reject(r)
			})
		}
	})
}
```

### 14.Promise.race封装

```javascript
// 添加 race 方法
Promise.race = function(promises) {
	return new Promise((resolve, reject) => {
		for(let i=0; i<promises.lenght; i++){
			promises[i].then(v => {
				// 修改返回对象状态为【成功】
				resolve(v)		
			}, r => {
				// 修改返回对象状态为【失败】
				reject(r)
			})
		}
	})
}
```

### 15.回调函数的异步执行

不管用户的任务是同步任务还是异步任务，其指定的回调函数都应该异步执行，应用场景如下：

```javascript
let p1 = new Promise((resolve, reject) => {
    resolve('ok')
    console.log('111')
})

p1.then(value => {
    console.log('222')
}, reason => {
    console.log(reason)
})

console.log('333')

// 输出
111
333
222
```

因此，需要为指定的回调函数设置为异步执行，其办法为包裹一个定时器：

```javascript
// 声明构造函数
function Promise(executor) {
    ...
    // resolve 函数
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'fulfilled'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调
        setTimeout(() => {						// 此处【异步】
            self.callbacks.forEach(item => {
                item.onResolved(data)
            })	
        });
    }
    // reject 函数
    function reject(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1.修改对象状态 (promiseState)
        self.PromiseState = 'rejected'
        // 2.修改对象结果值 (promiseResult)
        self.PromiseResult = data
        // 执行回调
        setTimeout(() => {						// 此处【异步】
            self.callbacks.forEach(item => {
                item.onRejected(data)
            })	
        });
    }
    try{
        // 同步调用【执行器函数】
        executor(resolve, reject)
    }catch(e) {
        // 修改 promise 对象为【失败】
        reject(e)
    }
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {
	const self = this
	// 判断回调函数参数
	if(typeof onRejected !== 'function'){
		onRejected = reason => {
			throw reason
		}
	}
	if(typeof onResolved !== 'function'){
		onResolved = value => value
	}
	return new Promise((resolve, reject) => {
		...
		// 调用回调函数 PromiseState
		if(this.PromiseState === 'fulfilled'){		// 此处【异步】
			setTimeout(() => {
				callback(onResolved)
			});
		}
		if(this.PromiseState === 'rejected') {		// 此处【异步】
			setTimeout(() => {
				callback(onRejected)
			});
		}
		...
	})    
}
```

