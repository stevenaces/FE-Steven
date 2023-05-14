## Object-Map

> Object 与 Map 比较可参考 [MDN说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#object_%E5%92%8C_map_%E7%9A%84%E6%AF%94%E8%BE%83)

比较点如下：
- 意外的键
- 键的类型：Map可以是任意值；Object只能是String，Symbol，设置为数字也会转为String
- 键的顺序：Map有序；Object无序，或者说尽量不要依赖该顺序
- Size：Map有对应API直接获取；Object需要手动统计
- 迭代：Map 可以被`forEach`迭代，Object不行
- 性能
- 序列化：Map序列化比较麻烦；Object可以方便进行序列化。