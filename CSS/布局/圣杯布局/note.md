# 圣杯布局

何为圣杯布局？左右两栏固定宽度，中间宽度自适应。

## 思路：定位+浮动

先看html结构：

```html
<body>
    <div id="header">#header</div>
    <div id="container">
        <div id="center" class="column">#center</div>
        <div id="left" class="column">#left</div>
        <div id="right" class="column">#right</div>
    </div>
    <div id="footer">#footer</div>
</body>
```

1. 首先给header、footer、container一个固定的高度，宽度100%；给left、right一个固定的宽度，高度为container的定高；center宽度100%。
2. 然后给container内的三个子元素float:left;浮动，但是因为center的宽度是container的100%所以left和right并没有与center浮动在一行。
3. 为了使left和right浮动与center一行，可以使用margin-left属性，给left（margin-left:-100%）这样left就覆盖在center的左边；给right（margin-left:-【right的宽度】）这样子right就覆盖在了center的右边。
4. 虽然container的子元素现在都在一行上面，但是center内容的宽度还是container的100%，所以给container一个padding,左右分别与left和right等宽。
5. 这时候left和right还是覆盖在center上，所以可以给container开启相对定位，然后将left和right分别移动对应的宽度，这样container的子元素刚好占满container 的宽度。

**总结**：利用负margin-left将当前元素拉向左边，使左右两栏浮动到同一行。

