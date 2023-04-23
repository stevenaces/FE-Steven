/* 父类 */
function Super(name) {
	this.name = name;
	this.colors = ["red", "green"];
}

Super.prototype.sayName = function () {
	console.log(this.name);
};

/* 子类 */
function Sub(name, age) {
	Super.call(this, name);
	this.age = age;
}

Sub.prototype = new Super();

Sub.prototype.sayAge = function () {
	console.log(this.age);
};

let s1 = new Sub("steven", 23);

s1.colors.push("blue");
console.log(s1.colors); // ['red', 'green', 'blue']
s1.sayAge(); // 23
s1.sayName(); // steven

let s2 = new Sub("min", 20);
console.log(s2.colors); // ['red', 'green']
s2.sayAge(); // 20
s2.sayName(); // min

// 组合继承（伪经典继承） 实现了 子类实例既有自己的属性，又能调用父类身上的方法，还保留了以下两种能 识别 合成对象的方法
console.log(s2 instanceof Sub); // true
console.log(s2 instanceof Super); // true
console.log(s2 instanceof Object); // true

console.log(Sub.prototype.isPrototypeOf(s1)); // true
console.log(Sub.prototype.isPrototypeOf(s2)); // true
