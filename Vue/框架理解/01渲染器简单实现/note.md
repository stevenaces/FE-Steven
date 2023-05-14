## 渲染器实现

> 笔记总结自 [王红元](https://ke.qq.com/course/3453141#term_id=103590371) 课程

- 虚拟DOM
- 生成虚拟DOM函数`h()`
- 挂载函数`mount()`
- diff算法，也就是`patch()`

### 虚拟DOM
虚拟DOM是对浏览器真实DOM的一种抽象，使用JavaScript的对象来模拟真实DOM，方便进行对比等操作。因为虚拟DOM是一种抽象，所以可以利用这种思想实现自己的`渲染器`做 `原生应用`，例如：`React Native`技术。

### 生成虚拟DOM函数`h()`
传入一些能代表真实DOM的参数，然后返回虚拟DOM，其实也就是一个JavaScript对象。

### 挂载函数`mount()`
传入虚拟DOM和挂载点，然后根据虚拟DOM创建真实DOM元素，在挂载点进行挂载。

### diff算法，也就是`patch()`
传入新旧的虚拟DOM，进行diff算法比较，然后更新页面。