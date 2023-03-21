// 工厂模式用于抽象创建特定对象的过程

function createPerson(name, age, job) {
	let o = new Object();

	o.name = name;
	o.age = age;
	o.job = job;

	o.sayName = function () {
		console.log(o.name);
	};
}

let person1 = createPerson("steven", 25, "frontend");

/**
 * Q: 工厂模式虽然可以解决创建多个类似对象的问题，但是没有解决对象标识问题（即创建的对象是什么类型）
 * 这里的理解就是通过 typeof 来判断 person1 类型时， 只能知道他是 Object类型
 */
