// ECMAScript中构造函数可以创建特定类型对象，因此可以用这种方法解决 【工厂模式】不能指定创建对象特定类型的问题
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		console.log(this.name);
	};
}

let person1 = new Person("steven", 25, "frontend");
let person2 = new Person("Kuke", 34, "chief");

/**
 * 利用构造函数创建的对象就有了类型（可以确保实例被标识为特定类型），后面可以使用 instanceof 来判断对象类型
 */

console.log(person1 instanceof Person);
console.log(person1 instanceof Object);

/**
 *  构造函数不一定要写成函数声明形式，使用函数表达式也是可以的；
 *  如果使用new时，在不需要对构造函数传参的情况下，括号可以省略；
 *  构造函数也是函数，也可以直接作为函数调用，如果作为函数调用，属性会添加到window对象身上，可以通过bind, call, apply来指定 this 作用域。
 */

/**
new 操作符的执行过程如下：
1. 创建（或者说构造）一个全新的对象
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部代码（给新对象添加属性）
5. 如果函数没有返回其他对象，那么 new 表达式中的函数会自动返回这个新对象。 
*/
// 手写 new 关键字
function create(fn, args) {
	let obj = {};

	Object.setPrototypeOf(obj, fn.prototype);

	const result = fn.call(obj, args);

	return result instanceof Object ? result : obj;
}

/**
 Q：构造函数的主要问题在于，其定义的方法会在每个实例上创建一遍。
 例如上面的person1和person2都有同名sayName()方法，但这两个方法不是同一个Function实例；
 从逻辑上来讲，上面这个构造函数等同于：
 */
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = new Function("console.log(this.name)");
}
// 结果就是
console.log(person1.sayName == person2.sayName); // false

/**
上面可以看出，做的事情都是一样的，所以没必要定义两个不同的 Function 实例。因此，利用this对象可以把函数与对象的绑定推迟到运行时，暂时解决。
 */

function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}

function sayName() {
	console.log(this.name);
}

let person3 = new Person("steven", 25, "frontend");
let person4 = new Person("Kuke", 34, "chief");
person3.sayName(); // steven
person4.sayName(); // Kuke

/* 
虽然解决了相同逻辑函数重复定义问题，但全局作用域也因此被搞乱了，因为这个函数实际上只会在一个对象上调用。
另外如果对象需要多个方法，就要在全局作用域定义多个函数，这样导致自定义类型引用的代码不能很好的聚集在一起。
*/
