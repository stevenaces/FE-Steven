function outerFunction() {
    var count = 0;
    function innerFunction() {//这就是闭包！
        count++;                //innerFunction能访问到外部count变量
        console.log(count);
    }
    return innerFunction;
}

var add = outerFunction();
add(); // 1
add(); // 2
add(); // 3
