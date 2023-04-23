function createAnother(original) {
	// 通过调用函数创建一个新对象，例如可以使用【原型式继承】
	const clone = Object.create(original);

	clone.sayHi = function () {
		// 以某种方式增强这个对象
		console.log("Hi");
	};
	return clone;
}

let person = {
	name: "steven",
	friends: ["A", "B", "C"],
};

const anotherPerson = createAnother(person);
anotherPerson.sayHi();
