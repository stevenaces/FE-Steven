## BFC理解

### 什么是BFC
BFC是Block Formatting Context(块级格式上下文)的缩写
BFC是一个独立的空间，里面子元素的渲染不影响外面的布局

### BFC作用
1、解决margin塌陷
2、清除浮动

### 如何触发BFC
- `overflow: hidden`
- `display: inline-block table-cell flex`
- `position: absolute fixed`