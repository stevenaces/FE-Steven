# 双栏布局

实现一个双栏布局，左侧栏固定宽度，右侧栏自适应

## 思路一：float+BFC

1. left写死宽度，right宽度100%。
2. 给left设置向左浮动，因为后面的兄弟元素right宽度为100%，所以会无视浮动元素的位置占满一行。这样right会被left覆盖一部分。
3. 可以通过触发right的BFC，避免right被left覆盖。设置overflow: hidden。此时right会占据剩余宽度，避免和left重叠。同时right内的元素可以正常布局，不会受外部浮动的影响。

html部分：

```html
<div class="container">
    <div class="header">header</div>
    <div class="left">left</div>
    <div class="right">right
        <div class="content">content</div>
    </div>
</div>
```

css部分

```css
html,body {
        height: 100%;
    }

    .container{
        height: 100%;
    }

    .header {
        width: 100%;
        background-color: black;
    }
    
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: brown;
    }

    .right {
        overflow: hidden;
        height: 100%;
        background-color: blue;
    }

    .content {
        margin: 10px;
        background-color: pink;
    }
```

## 思路二：flex

设置父容器display: flex；left固定宽度；right设置flex:1，占据剩余宽度。

html部分：

```html
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
```

css部分：

```css
    .container{
        display: flex;
    }
    .left {
        width: 100px;
        height: 100px;
        background-color: brown;
    }

    .right {
        flex: 1;
        background-color: blue;
    }
```

## 思路三：absolute

1. 父容器设置相对定位position:relative；固定left元素宽度；right元素设置绝对定位position:absolute。
2. rigth元素的设置left:300px,其他方向为0。子绝夫相。right元素会根据设置了相对定位的父元素来进行定位。

html部分：

```html
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
```

css部分

```css
    * {
        margin: 0;
        padding: 0;
    }
    html, body {
        width: 100%;
        height: 100%;
    }
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .left {
        width: 300px;
        height: 100%;
        background-color: #4bbf4d;
        text-align: center;
    }

    .right {
        position: absolute;
        height: 100%;
        background-color: #14adea;
        text-align: center;
        top: 0;
        left: 300px;
        right: 0;
        bottom: 0;
    }
```

