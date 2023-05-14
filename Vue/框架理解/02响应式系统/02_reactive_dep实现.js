class Dep {
	constructor() {
		this.subscribes = new Set();
	}

	addEffect(effect) {
		this.subscribes.add(effect);
	}

	notify() {
		this.subscribes.forEach((effect) => {
			effect();
		});
	}
}

const info = { counter: 100 };

const dep = new Dep();

function doubleCounter() {
	console.log(info.counter * 2);
}

function powerCounter() {
	console.log(info.counter * info.counter);
}

// 需要手动收集依赖
dep.addEffect(doubleCounter);
dep.addEffect(powerCounter);

// info 值发生了变化
info.counter++;
// 需要手动触发依赖
dep.notify();
