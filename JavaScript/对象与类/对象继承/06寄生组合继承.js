/* 工具函数 */
function inheritPrototype(Super, Sub) {
	// 创建对象
	const o = Object.create(Super);

	// 增强对象
	o.constructor = Sub;

	// 赋值对象
	Sub.prototype = o;
}

function Super(name) {
	this.name = name;
	this.color = ["red", "blue"];
}

Super.prototype.sayName = function () {
	console.log(this.name);
};

function Sub(name, age) {
	Super.call(this, name);

	this.age = age;
}

inheritPrototype(Sub, Super);

Sub.prototype.sayAge = function () {
	console.log(this.age);
};

let s = new Sub("steven", 23);

s.sayName();
// s.sayAge();
