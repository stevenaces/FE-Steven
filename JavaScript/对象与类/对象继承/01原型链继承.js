/* 父类 */
function Super() {
	this.name = "Steven";
	this.colors = ["red", "gree"];
}

Super.prototype.getSuperNameValue = function () {
	console.log(this.name);
};

let Super1 = new Super();
let Super2 = new Super();

Super1.color.push("blue");

console.log(Super1.color); // ['red', 'gree', 'blue']
console.log(Super2.color); // ['red', 'gree']

/* 子类 */
function Sub() {}

Sub.prototype = new Super();

let s1 = new Sub();
let s2 = new Sub();

// 1. 父类引用类型共享，不能区分
console.log(s1.color); // ['red', 'gree', 'blue']
console.log(s2.color); // ['red', 'gree', 'blue']

// 2. 子类实例化时不能给父类函数传参
// 由此，引出了 「经典继承（盗用构造函数）」 的继承方式
