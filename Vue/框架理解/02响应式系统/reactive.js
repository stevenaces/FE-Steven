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

const targetMap = new WeakMap();

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
