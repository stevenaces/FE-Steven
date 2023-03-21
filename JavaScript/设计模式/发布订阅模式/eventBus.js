// 源自：https://blog.csdn.net/time_____/article/details/113770950

// 发布/订阅 设计模式(Pub/Sub)
class EventBus {
	constructor() {
		this._eventList = {};
	}

	/**
	 * [单例模式]
	 * @returns 返回当前类的实例单例
	 */
	static Instance() {
		if (!EventBus._instance) {
			Object.defineProperty(EventBus, "_instance", {
				value: new EventBus(),
			});
		}
		return EventBus._instance;
	}

	/**
	 * 注册事件至调度中心【订阅者 Subscriber】
	 * @param {*} type 事件类型，特指具体事件名
	 * @param {*} fn 事件注册的回调
	 */
	onEvent(type, fn) {
		if (!this.isKeyInObj(this._eventList, type)) {
			//若调度中心未找到该事件的队列，则新建某个事件列表（可以对某个类型的事件注册多个回调函数）
			Object.defineProperty(this._eventList, type, {
				value: [],
				writable: true,
				enumerable: true,
				configurable: true,
			});
		}
		// if (!this._eventList[type]) {
		// 	this._eventList[type] = [];
		// }
		this._eventList[type].push(fn);
	}

	/**
	 * 触发调度中心的某个或者某些该事件类型下注册的函数【发布者 Publisher】
	 * @param {*} type 事件类型，特指具体事件名
	 * @param {*} data 发布者传递的参数
	 */
	emitEvent(type, data) {
		if (this.isKeyInObj(this._eventList, type)) {
			for (let i = 0; i < this._eventList[type].length; i++) {
				this._eventList[type][i] && this._eventList[type][i](data);
			}
		}
	}

	// 销毁监听
	offEvent(type, fn) {
		for (let i = 0; i < this._eventList[type].length; i++) {
			if (this._eventList[type][i] && this._eventList[type][i] === fn) {
				this._eventList[type][i] = null;
			}
		}
	}

	/**
	 * 检查对象是否包含该属性，除原型链
	 * @param {*} obj 被检查对象
	 * @param {*} key 被检查对象的属性
	 * @returns
	 */
	isKeyInObj(obj, key) {
		return Object.hasOwnProperty.call(obj, key);
	}
}

module.exports = EventBus.Instance();
