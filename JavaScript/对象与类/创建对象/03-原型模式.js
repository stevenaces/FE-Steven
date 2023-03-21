/* 
每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该有特定引用类型的实例共享的属性和方法。
实际上这个对象就是通过调用构造函数创建的对象的原型。
使用原型对象的好处就是，在它上面定义的属性和方法可以被对象实例共享。
*/

function Person() {}
Person.prototype.name = "steven";
Person.prototype.age = 25;
Person.prototype.job = "frontend";
Person.prototype.sayName = function () {
	console.log(this.name);
};

let person1 = new Person();
person1.sayName(); // steven

let person2 = new Person();
person2.sayName(); // steven

console.log(person1.sayName === person2.sayName); // true

// 同样，也可以使用函数表达式

/**
 * 与构造函数模式不同，使用原型模式定义的属性和方法是由所有实例共享的
 */

/**
 理解原型：
 构造函数的prototype属性值就是其原型对象；这个原型对象的constructor属性值就是这个构造函数。两者循环引用。
 正常的原型链都会终止于Object的原型对象，而Object原型对象的原型则是null。
 构造函数、原型对象、实例是 3 个完全不同的对象；
 实例与构造函数没有直接联系，与原型对象有直接联系
*/

// 常用 API
console.log(Person.prototype.isPrototypeOf(person1)); // true
console.log(Object.prototype.getPrototype(person1) == Person.prototype); // true
Object.prototype.setPrototypeOf();

// 为了避免使用 setPrototypeOf() 可能造成的性能下降，可以用 Object.create()来创建一个新对象，同时为其指定原型
let biped = {
	numLegs: 2,
};

let person = Object.create(biped);
person.name = "steven";

console.log(person.name); // steven
console.log(person.numLegs); // 2
console.log(Object.getPrototypeOf(person) === biped); // true
