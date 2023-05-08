/* 父类 */
function Super(name) {
	this.name = name;
	this.colors = ["red", "gree"];
}

Super.prototype.getSuperNameValue = function () {
	console.log(this.name);
};

/* 子类 */
function Sub(name, age) {
	// 盗用构造函数，并 传参 给父类
	Super.call(this, name);

	// 确保父类构造函数不会覆盖子类定义的属性，可以在调用父类构造函数之后再给子类实例添加额外属性
	this.age = age;
}

let s1 = new Sub("steven", 25);
let s2 = new Sub("min", 34);

s1.colors.push("blue");
console.log(s1.colors); // ['red', 'gree', 'blue']
console.log(s2.colors); // ['red', 'gree']

console.log(s1.name); // steven
console.log(s2.name); // min

// 子类构造函数可以向父类构造函数传参

// 存在的问题： 子类不能访问父类原型上定义的方法，于是结合 原型链 和 这种继承，实现了新的继承方式——组合继承
