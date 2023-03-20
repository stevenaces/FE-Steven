/* JavaScript 中的 new 与其他面型对象语言 new 的区别
 *  实际上并不存在所谓的 构造函数，只有对于函数的 构造调用
 */

/* 使用 new 关键字 来调用函数，或者说发生构造函数调用时，会自动执行下面操作：
1. 创建（或者说构造）一个全新的对象
2. 这个新对象会执行[[Prototype]]连接
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数会自动返回这个新对象。 
*/

function foo(a) {
	this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2

/**
 * 手写 new 的实现原理
 * @param {*} fn 构造函数
 * @param  {...any} args 调用构造函数的参数
 * @returns 调用构造函数返回的对象
 */
function create(fn, ...args) {
	// 1. 创建一个新对象
	const obj = {};

	// 2. 将对象原型[[prototype]]属性设置为fn原型
	Object.setPrototypeOf(obj, fn.prototype);

	// 3. 这个新对象会绑定到函数调用的 this
	const res = fn.apply(obj, args);

	// 4. 如果函数没有返回其他对象，那么 new 表达式中的函数会自动返回这个新对象
	return res instanceof Object ? res : obj;
}

function Animal(name, age) {
	this.name = name;
	this.age = age;
}

const dog = create(Animal, "小黑", 2);
console.log(dog.name);
