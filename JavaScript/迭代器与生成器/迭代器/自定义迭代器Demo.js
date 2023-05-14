const stuInfo = {
	students: ["A", "B", "C", "D"],
	[Symbol.iterator]() {
		let _this = this;
		let idx = 0;
		return {
			next() {
				return idx < _this.students.length
					? { value: _this.students[idx++], done: false }
					: { value: undefined, done: true };
			},
		};
	},
};

// stuInfo 这个对象本身不可迭代，但是我们在这个对象身上实现了可迭代协议，现在它可以被迭代了
console.log("通过for...of自动迭代的输出：");
for (let stu of stuInfo) {
	// stu 会自动从 {value: xxx, done:yyy} 中解构 value
	console.log(stu);
}

// 下面代码更加清晰的展示了这个过程
console.log("通过迭代器对象进行手动迭代的输出：");
const It = stuInfo[Symbol.iterator](); // 获取到迭代器对象
console.log(It.next());
console.log(It.next());
console.log(It.next());
console.log(It.next());
console.log(It.next());
