## 迭代器
> 总结自 《JavaScript高级程序设计（第四版）》

- 迭代器模式


### 迭代器模式
迭代器模式描述了一个方案，即可以把有些结构称为**可迭代对象**，因为它们实现了正式的`Iterable`接口，而且可以通过迭代器`Iterator`消费。

**可迭代协议**
实现Iterable接口（可迭代协议）要求同时具备两种能力：
- 支持迭代的自我识别能力
- 创建实现Iterator接口的对象的能力
  
意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的`Symbol.iterator`作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

看晕了，直接上代码吧，为一个不可迭代的对象实现可迭代协议，使其可以迭代吧。代码在[自定义迭代器Demo.js](./%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%AD%E4%BB%A3%E5%99%A8Demo.js)
```javascript
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
// A
// B
// C
// D

// 下面代码更加清晰的展示了这个过程
console.log("通过迭代器对象进行手动迭代的输出：");
const It = stuInfo[Symbol.iterator](); // 获取到迭代器对象
console.log(It.next());  // { value: 'A', done: false }
console.log(It.next());  // { value: 'B', done: false }
console.log(It.next());  // { value: 'C', done: false }
console.log(It.next());  // { value: 'D', done: false }
console.log(It.next());  // { value: undefined, done: true }
```