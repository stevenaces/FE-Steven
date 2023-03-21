// 源自：https://blog.csdn.net/time_____/article/details/113770950
const EventBus = require("./eventBus");

let list = []; // 记录异步操作
let count = 0; // 计数器

let timeTick = setInterval(function () {
	if (count++ > 3) {
		EventBus.offEvent("finish", eventHandler);
		clearInterval(timeTick);
	}
	list.push(count);
	EventBus.emitEvent("finish", { list });
}, 1000);

EventBus.onEvent("finish", eventHandler);

function eventHandler(e) {
	console.log(e);
}
