var obj = {
	a: 1,
	b: 2,
};

function simpleClone(obj) {
	var cloneObj = {};

	// ES 3
	// for (var key in obj) {
	// 	cloneObj[key] = obj[key];
	// }

	// ES 5
	// Object.getOwnPropertyNames(obj).forEach(function (key) {
	// 	var desc = Object.getOwnPropertyDescriptor(obj, key);
	// 	Object.defineProperty(cloneObj, desc);
	// });

	// ES 6
	// for (var [key, value] of Object.entries(obj)) {
	// 	cloneObj[key] = value;
	// }

	return obj;
}

var cloneObj = simpleClone(obj);
console.log(cloneObj);
obj.a = 100;
console.log(obj);
console.log(cloneObj);

var obj = {
	a: 1,
	b: 2,
	c: {
		x: 10,
		y: {
			i: 100,
			j: {
				m: 1000,
			},
		},
	},
};

/**
 *  深拷贝简单版
 * @param {*} obj 待拷贝对象
 * @returns 拷贝结果对象
 */
function DeepClone(obj) {
	let cloneObj = {};

	for (var key in obj) {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			cloneObj[key] = DeepClone(obj[key]);
		} else {
			cloneObj[key] = obj[key];
		}
	}

	return cloneObj;
}
