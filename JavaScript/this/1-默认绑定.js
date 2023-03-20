/**
 * this是一个很特别的关键字，被自动定义在所有函数的作用域中；
 *
 * 在设计API的时候，虽然可以通过参数以及API调用来显示的传递上下文对象，但是当模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 this 则不会这样。在介绍对象和原型时，就会明白函数可以自动引用合适的上下文对象 有多重要
 */

/* 在没有其他情况下，根据 当前调用位置 绑定 this */
// 独立函数调用。
function foo() {
	console.log(this.a);
}
var a = 2;
foo(); // 2

/* 严格模式下， 默认绑定， this 绑定到 undefined 上 */
function foo2() {
	"use strict";
	console.log(this.a);
}
var a = 2;
foo2(); // TypeError

/* 在严格模式下，调用 foo3 则不影响默认绑定，this 会绑定到 全局对象 */
function foo3() {
	console.log(this.a);
}
var a = 2;
(function () {
	"use strict";
	foo3(); // 2
})();
