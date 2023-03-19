// 以下内容来自于：https://juejin.cn/post/6844904121577766919

/**
 * 浅拷贝
 */
let obj = {
	name: "steven",
	res: {
		value: 101,
	},
};

// Object.assign()
let cloneObj1 = Object.assign({}, obj);

// Spread 语法
let { ...cloneObj2 } = obj;

// Array.prototype.slice
const arr = ["steven", { value: 101 }];
const cloneArr1 = arr.slice(0);

// Array.prototype.concat
const cloneArr2 = [].concat(arr);

// 对于数组来说，只要重新返回新数组的高阶函数都可以实现浅拷贝，map, filter, reduce

/**
 * 比较完整的深拷贝
 */

// 以这个对象为例，包行了各种类型值和循环引用
var $obj = {
	func: function () {
		console.log("this is function");
	},
	a: null,
	c: {
		a: 1,
	},
	b: undefined,
	symbol: Symbol(),
	date: new Date(),
	e: new RegExp("regexp"),
	f: new Error("error"),
};

// 构造循环引用
$obj.c.d = $obj;

// JSON版本
// 存在问题：会忽略 undefined, symbol; 不能序列号函数，不能解决循环引用问题，不能正确处理 Date, RegExp, Error对象
const clone$Obj = JSON.parse(JSON.stringify($obj));

/**
 * 简单版本
 * 存在问题：不能解决循环引用问题，对于Date、RegExp、Error也不能拷贝
 * @param {*} obj 待拷贝对象
 * @returns 拷贝结果对象
 */
function DeepCloneV1(obj) {
	// 属性值不为 null 且 是原始类型，直接返回
	if (obj === null || typeof obj !== "object") return obj;

	// 判断属性值是 数组 还是 对象 类型
	let copy = Object.isArray(obj) ? [] : {};

	// 开始拷贝值
	Object.keys(obj).forEach((key) => {
		copy[key] = DeepCloneV1(obj[key]);
	});

	return copy;
}

/**
 * 深拷贝完整版
 * @param {*} obj 待拷贝对象
 * @param {*} cache 已拷贝对象缓存
 * @returns 拷贝结果对象
 */
function DeepCloneV2(obj, cache = []) {
	// 1. 值为函数
	if (typeof obj === "function") return copyFn(obj);

	// 2. 值为原始类型
	if (obj === null || typeof obj !== "object") return obj;

	// 3. 值为三种对象
	if (Object.prototype.toString.call(obj) === "[object Date]")
		return new Date(obj);
	if (Object.prototype.toString.call(obj) === "[object RegExp]")
		return new RegExp(obj);
	if (Object.prototype.toString.call(obj) === "[object Error]")
		return new Error(obj);

	// 4. 循环引用问题
	const item = cache.filter((item) => item.original === obj)[0];
	if (item) return item;

	// 5. 判断属性值是 数组 还是 对象 类型
	let copy = Object.isArray ? [] : {};
	cache.push({ original: obj, copy });

	// 6. 递归拷贝
	Object.keys[obj].forEach((key) => {
		copy[value] = DeepCloneV2(obj[key], cache);
	});

	return copy;
}

// 拷贝函数
function copyFn(func) {
	const funStr = func.toString();

	// 根据是否存在函数原型，判断是否为箭头函数，确定返回值
	return func.prototype ? eval(`(${funStr})`) : eval(funStr);
}
