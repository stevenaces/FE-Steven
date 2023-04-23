/* 工具类 */
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

/* 待继承对象 */
const person = {
	name: "steven",
	friends: ["a", "b", "c"],
};

let p1 = object(person);
p1.name = "min";
p1.friends.push("d");
console.log(p1.name); // min
console.log(p1.friends); //['a', 'b', 'c', 'd']

let p2 = object(person);
p2.name = "tang";
p2.friends.push("e");
console.log(p2.name); // tang
console.log(p2.friends); // ['a', 'b', 'c', 'd', 'e']

console.log(p1.friends); // ['a', 'b', 'c', 'd', 'e']

console.log(person.name); // steven

// 这种继承非常适合 存在一个对象，想继承这个对象，且想共享这个对象的引用类型时的情况
// 为此，ES5 标准化了这一继承方式，使用 Object.create() 方法来实现
