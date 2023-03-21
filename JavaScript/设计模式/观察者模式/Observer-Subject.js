// 源自：https://blog.csdn.net/time_____/article/details/113770950

class Observer {
	//定义观察者类，每个实例化后的观察者拥有订阅（subscribe）功能

	constructor() {}

	/**
	 *	相当于 【on】
	 * @param {*} target 被观察者Subject的实例对象
	 * @param {*} fn 订阅注册的回调
	 */
	subscribe(target, fn) {
		target.observerList.push(fn);
	}
}

class Subject {
	//定义被观察者类，每个实例化后拥有注册的观察者回调的列表（observerList）和触发回调（fireEvent）功能

	constructor() {
		this.observerList = [];
	}

	/**
	 *	相当于 【emit】
	 * @param {*} e 被观察者传递给观察者的参数
	 */
	fireEvent(e) {
		this.observerList.forEach((item) => {
			item(e);
		});
	}
}

module.exports = {
	Observer,
	Subject,
};
