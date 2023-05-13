## BFC理解
> [尚硅谷张天禹讲BFC](https://www.bilibili.com/video/BV1p84y1P7Z5?p=199&vd_source=2dd02d64c29ab7eefcc5106eb9b51955)
### 什么是BFC
BFC是Block Formatting Context(块级格式上下文)的缩写
BFC是一个独立的空间，里面子元素的渲染不影响外面的布局

### BFC作用
1. 父元素开启BFC后，其子元素不会产生`margin塌陷`问题
2. 元素开启BFC后，自己不会被其它浮动元素所覆盖
3. 父元素高度由子元素高度撑开时，父元素开启BFC后，子元素再`浮动`时，父元素高度不会塌陷

> `margin塌陷`：在块元素中，第一个子元素的`margin-top`和最后一个子元素的`margin-bottom`的值会交给父元素，导致`margin塌陷`。

### 如何触发BFC (尚硅谷张天禹)
- 根元素
- 浮动元素
- 绝对定位、固定定位的元素
- 行内块元素
- 表格单元格：table、thead、tbody、tfoot、th、td、tr、caption 
- overflow的值不为`visible`的块元素
- 伸缩项目
- 多列容器
- column-span为1的元素（即使该元素没有包裹在多列容器中）
- display的值，设置为`f1ow-root`

### 如何触发BFC
- `overflow: hidden`
- `display: inline-block | table-cell | flex`
- `position: absolute | fixed`