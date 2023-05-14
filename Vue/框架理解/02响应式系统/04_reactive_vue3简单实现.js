class Dep {
	constructor() {
		this.subscribes = new Set();
	}

	depend() {
		if (activeEffect) {
			this.subscribes.add(activeEffect);
		}
	}

	notify() {
		this.subscribes.forEach((effect) => {
			effect();
		});
	}
}

/**
通过这样声明 响应式数据
let info = reactive({ counter: 101, name: "why" });
let foo = reactive({ height: 1.88 });

最终得到一个这样的 targetMap
targetMap = {
  {counter: 101, name: "why"}: { counter: new Dep(), name: new Dep() },
  {height: 1.88}: { height: new Dep() }
}
*/
const targetMap = new WeakMap();
// Map({key: value}): key是一个字符串
// WeakMap({key(对象): value}): key是一个对象, 弱引用

const getDep = (target, key) => {
	// 1. 根据对象(target)取出对应的Map对象
	let depsMap = targetMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}

	// 2. 取出具体dep对象
	let dep = depsMap.get(key);
	if (!dep) {
		dep = new Dep();
		depsMap.set(key, dep);
	}
	return dep;
};

const reactive = (raw) => {
	return new Proxy(raw, {
		get(target, key) {
			const dep = getDep(target, key);
			dep.depend();
			return target[key];
		},
		set(target, key, newValue) {
			const dep = getDep(target, key);
			target[key] = newValue;
			dep.notify();
		},
	});
};

// 理解 activeEffect 对于Dep是如何自动收集依赖的很重要！
let activeEffect = null;

const watchEffect = (effect) => {
	activeEffect = effect;

	effect();

	activeEffect = null;
};

/* 测试 */
const info = reactive({ counter: 101, name: "why" });
const foo = reactive({ height: 1.88 });

// Effect1
watchEffect(function () {
	console.log("Effect1 info.counter, info.name:", info.counter * 2, info.name);
});

// Effect2
watchEffect(function () {
	console.log("Effect2 info.counter, info.name:", info.counter ** 2, info.name);
});

// Effect3
watchEffect(function () {
	console.log("Effect3 info.name:", info.name);
});

// Effect4
watchEffect(function () {
	console.log("Effect4 foo.height:", foo.height);
});

info.counter++;
info.name = "lilei";
foo.height = 1.8;
