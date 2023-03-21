// 源自：https://blog.csdn.net/time_____/article/details/113770950

const { Observer, Subject } = require("./Observer-Subject");

class MyObserver extends Observer {}
class MySubject extends Subject {}

// 实例化两个观察者，同时对一个subject进行监听
const observer1 = new MyObserver();
const observer2 = new MyObserver();
const subject = new MySubject();

observer1.subscribe(subject, (e) => {
	console.log(e);
});

observer2.subscribe(subject, (e) => {
	console.log(e);
});

setTimeout(subject.fireEvent.bind(subject, "hello world"), 1000);
