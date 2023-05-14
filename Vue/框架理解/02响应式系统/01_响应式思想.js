const info = { counter: 12 };

// 一个副作用 effect，以及一次执行
function double() {
	console.log(info.counter);
}
double();

// 现在info.counter的值发生变化，需要手动执行副作用double函数
info.counter++;
double();

// 以本例子为例，响应式的目的就是希望，info.counter 的值发生变化，能够自动执行依赖它的副作用
info.counter++; // 无需再手动执行 double()

// 所以响应式的两个关键步骤就是：收集依赖，触发依赖
