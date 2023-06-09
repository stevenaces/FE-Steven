// 需要打印 1 2 3 4 5 6
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
// 打印 6 6 6 6 6

// 改进，利用立即执行函数创建闭包
for (var i = 1; i <= 5; i++) {
    (function fn(j) {
        setTimeout(function timer() {
            console.log(j)
        }, i * 1000)
    })(i)
}
