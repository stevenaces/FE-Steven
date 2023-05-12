## 事件
> 总结自《JavaScript高级程序设计(红宝书)》

- 理解事件流
- DOM0 与 DOM2绑定和移除事件
- 事件对象
- 事件类型
- 事件委托

### 事件流
DOM2 Events规范规定了事件流分为3个阶段：
1. 事件捕获：最不具体的节点最先收到事件，而最具体的节点应该最后收到事件。
2. 到达目标
3. 事件冒泡：从最具体的元素（文档树中最深节点）开始触发，然后向上传播至没有那么具体的元素。

### DOM0 与 DOM2绑定和移除事件
**DOM0**

绑定事件：
```javascript
let btn = document.getElementById('myBtn');
btn.onclick = function(){
  console.log('Clicked');
  console.log(this.id)  // myBtn; this 指向 该元素本身
}
```
移除事件：
```javascript
btn.onclick = null
```

**DOM2**

通过`addEventListener()`和`removeEventListener()`来分别绑定事件和移除事件。

绑定事件：
```javascript
let btn = document.getElementById('myBtn');
btn.addEventListener('click', function Log(){
  console.log('Clicked');
  console.log(this.id);  // myBtn; this 指向 该元素本身
}, false)
// 第三个参数默认是false，指定该事件在事件冒泡阶段处理；
// 如果指定为true，则指定该事件在事件捕获阶段处理。
```
移除事件：
```javascript
btn.removeEventListener('click', function Log(){
  console.log('Clicked');
  console.log(this.id);
}, false)
```
> 通过DOM2绑定事件时，事件处理程序（即Log函数）最好是具名函数；如果是匿名函数，在移除的时候会出现问题。

```javascript
let btn = document.getElementById('myBtn');
btn.addEventListener('click', ()=>{
  console.log('Clicked');
}, false);

// 在移除事件的时候，不知道事件处理程序填什么，如果写匿名函数，也是不对的
btn.removeEventListener('Click', ?, false)
btn.removeEventListener('Click', function(){
  console.log('Clicked');
}, false)
```
**小结**

DOM0对于同一类型事件，只能绑定一个事件处理程序；而DOM2可以绑定多个事件处理程序，按添加顺序触发；

### 事件对象
DOM发生事件时，所有相关信息都会被收集并存储在一个名为`event`的对象中。在DOM合规的浏览器中，event对象是传给事件处理程序的唯一参数。在DOM0和DOM2绑定和移除事件的方式中，都会传入。

```javascript
let btn = document.getElementById('myBtn');

btn.onclick = function(event){
  console.log(event.type);  // "click"
}

btn.addEventListener('click', (event) => {
  console.log(event.type);  // "click"
}, false)
```
**事件对象常见公共属性和方法**
- `bubbles`: 表示事件是否冒泡
- `cancelable`: 表示是否可以取消事件默认行为
- `currentTarget`: 当前时间处理程序所在元素
- `preventDefault()`: 用于取消事件的默认行为；只有`cancelable=true`才可以被调用；
- `stopPropagation()`: 用于取消所有后续时间捕获和事件冒泡；只有`bubbles=true`才可以被调用
- `target`: 事件目标
- `type`: 被触发的事件类型

### 事件类型

**常见事件类型**
- 用户界面事件：
  - load: 整个页面加载完成后触发；`img`标签也可触发该事件
  - unload: 文档卸载完成后触发；一般是从一个页面导航到另一个页面时触发，常用于清理引用，以避免内存泄漏。
  - abort
  - error
  - select
  - resize
  - scroll
- 焦点事件：
  - blur: 元素得到焦点触发，不冒泡
  - focus: 元素失去焦点触发，不冒泡
- 鼠标和滚轮事件
  - click
  - dblclick
    - dblclick事件之间的关系：`mousedown-> mouseup -> click -> mousedown-> mouseup -> click -> dblclick`
  - mousedown
  - mouseenter
  - mouseleave
  - mousemove
  - mouseout
  - mouseover
  - mouseup
- ...

**H5事件**
- beforeunload: 用意是给开发者提供阻止页面被卸载的机会。
- DOMContentLoaded: DOM树构建完成后立即触发，不用等待图片、js、css等其他资源加载完成。
- readystatechange
- pageshow/pagehide

### 事件委托
问题：
事件处理程序都是函数，也是对象，对象会占用内存，对象也多，性能越差；
为指定事件处理程序所访问DOM的次数会先期造成整个页面交互的延迟；

“过多事件处理程序”的解决方案是使用`事件委托`。事件委托利用`事件冒泡`，可以只使用一个事件处理程序来管理一种类型的事件。

**Demo**
```html
<ul id="myLinks">
  <li id="go">Go somewhere</li>
  <li id="do">Do something</li>
  <li id="sayHi">Say Hi</li>
</ul>

<script>
  // 利用事件委托绑定事件处理程序和处理不同行为
  let list = document.getElementById("myLinks");
  list.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
      case "do":
        document.title = "I changed the document's title";
        break;
      case "go":
        location.href = "https://www.xxx.com";
        break;
      case "sayHi":
        console.log("hi");
        break;
    }
  });
</script>
```
**小结**

1. 最适合使用事件委托的事件包括：`click, mousedown, mouseup, keydown, keypress`；

2. 只要可行，应该考虑只给`document`添加一个事件处理程序，这种方式具有如下优点：
- document对象随时可用，只要页面渲染出可点击的元素，就可以无延迟的起作用；
- 节省花在设置页面事件处理程序上的时间；
- 减少整个页面所需的内存，提升整体性能。