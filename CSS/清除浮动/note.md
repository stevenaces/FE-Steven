## 如何清除浮动？手写clearfix

### 清除浮动的方法
- 父级加 `overflow: hidden`
- 父级也浮动
- 父级设置 clearfix


`clearfix`类 加到浮动的父级元素上
```css
.clearfix:after{
  content: "";
  display: block;
  clear: both;  
}
```

这样尽管清除了浮动带来的父元素高度坍缩问题，但是如果浮动元素后面还有元素要排版，会与浮动元素重叠，所以可以使用index.html中的`老式写法`。