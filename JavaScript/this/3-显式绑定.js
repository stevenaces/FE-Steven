/* 刚刚看到了，隐式绑定是在一个对象中，通过一个属性，指向被引用的函数，构造了上下文，实现了绑定。
 *  方法：使用call(param)，apply(param)
 *  第一个参数param等待的是一个对象，就是给this准备的，在函数调用的时候将其绑定到 this。
 *  如果param不是一个对象，如string，boolean，number，就进行"装箱"。
 *  因为可以直接指定 this 的绑定对象，所以称之为 显示绑定。
 */

/* 第一种：硬绑定 */
function foo() {
	console.log(this.a);
}
var obj = {
	a: 2,
};
var a = "xxx";
foo.call(obj); // 2
// 单身男（foo） 媒婆（call，apply） 单身女（obj）

/* 硬绑定解决 隐式绑定 绑定丢失的问题 */
function foo1() {
	console.log(this.a);
}
var obj = {
	a: 2,
};
function bar() {
	foo1.call(obj);
}

bar(); // 2
setTimeout(bar, 100); // 2

// 通过硬绑定已经绑定this的 bar 不可能再修改它的 this
bar.call(window); // 2

/* 应用场景1：创建一个包裹函数，负责接收参数并返回值 */
function foo2(something) {
	console.log(this.a, something);
	return this.a + something;
}
var obj = {
	a: 2,
};
var bar = function () {
	return foo2.apply(obj, arguments);
};
var b = bar(3); // 2 3
console.log(b); // 5

/* 应用场景2：创建一个可重复使用的辅助函数 */
function bind(fn, obj) {
	//简单的绑定函数
	return function () {
		return fn.apply(obj, arguments);
	};
}
var obj = {
	a: 2,
};
var bar = bind(foo, obj);
var b = bar(3); // 2 3
console.log(b); // 5

/* 总结：由于这种模式非常有用且常用，ES5特意提供了内置方法 Function.prototype.bind， 用法如下 */
function foo4(something) {
	console.log(this.a, something);
	return this.a + something;
}
var obj = {
	a: 2,
};

var bar = foo4.bind(obj);
var b = bar(3); // 2 3
console.log(b); // 5

/* 第二种：API调用的"上下文" */
/* 许多第三方库里的函数，以及js语言宿主环境中许多内置函数，都提供了一个可选参数，
 *  通常成为 上下文 ，其作用和bind(...)一样，确保你的回调函数使用指定的 this
 */
function foo5(el) {
	console.log(el, this.id);
}
var obj = {
	id: "awesome",
};

// 调用 foo5时，把 this 绑定到 obj
[1, 2, 3].forEach(foo5, obj); // 1 awesome 2 awesome 3 awesome
// 实际就是通过 call或者apply 实现了显示绑定。
