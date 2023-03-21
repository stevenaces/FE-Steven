/* 调用位置是否有 上下文对象 */
/* 规则2：当函数引用有上下文对象，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。 */
function foo1() {
	console.log(this.a);
}
var obj = {
	a: 2,
	foo: foo1, // 这里有一点需要注意，这个foo1函数无论在这里定义还是引用，严格来说都不属于obj对象。
	// note1：这点也好理解，根据c语言知识联想，函数就是内存里的一段代码，函数名就是指向这段代码开始位置的指针。
};
obj.foo(); // 2

// 对象属性引用链中只有上一层或者说最后一层在调用中起作用
function foo1() {
	console.log(this.a);
}
var obj2 = {
	a: 42,
	foo: foo1,
};
var obj1 = {
	a: 2,
	boj2: obj2,
};
obj1.boj2.foo(); // 42

/* 隐式丢失 */
// 简单来说，就是会应用 默认绑定，至于会绑定到 全局对象还是undefined，看是否是严格模式
function foo3() {
	console.log(this.a);
}
var obj = {
	a: 2,
	foo: foo3,
};
var bar = obj.foo; // 函数别名
var a = "oops, global";
bar(); // "oops, global"
// 根据note1，个人理解，bar还是指向了foo3函数在内存中的起始位置，所以调用时自然不存在obj上下文；

/* 下面这段代码同样也是隐式丢失 */
function foo4() {
	console.log(this.a);
}
function doFoo(fn) {
	fn();
}
var obj = {
	a: 2,
	foo: foo4,
};
var a = "oops, global";
doFoo(obj.foo); // "oops, global"
// 个人理解：这不还是把指向foo4函数的指针传进去了嘛！自然在运行的时候也不存在obj上下文啦
// doFoo内心OS：我调foo4，与你obj而有什么关系？我只是通过你找到了foo4而已。
