# new vue()时发生了什么
vue的构造函数只有一个_init()方法，我们看看这个init方法都做了什么
## 合并选项

## 初始化操作
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')
