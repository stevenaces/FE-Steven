## 使用`Vuex`时，关于`mapState/mapGetters`的使用和封装

- 不使用mapState/mapGetters
- mapState/mapGetters的基本使用
- mapState/mapGetters在Vue3的 composition API中的使用与存在的问题
- 在composition API中对这mapState/mapGetters进行封装
- 封装后文件组织规范
- 多模块store封装的完善

### 0. 预设Store
为了叙述方便，假设现在有如下store:
```javascript
import { createStore } from "vuex";

const store = createStore({
	state: () => ({
		counter: 1,
		name: "steven",
		age: 21,
		weight: 70,
		height: 1.75,
	}),
	getters: {
		BMI(state) {
			return state.weight / (height * height);
		},
		BMI_Category(state, getters) {
			if (getters.BMI <= 18.4) return "slender";
			else if (getters.BMI > 18.4 && getters.BMI <= 23.9) return "normal";
			else if (getters.BMI > 23.9 && getters.BMI <= 27.9) return "overWeight";
			else if (getters.BMI > 27.9 && getters.BMI <= 32) return "fat";
			else return "overFat";
		},
	},
});

```
### 1. 不使用 mapState/mapGetters
在不使用 `mapState/mapGetters` 的情况下，如果是在template中使用 state 或 getters 的值，则按如下方式使用：
```html
<template>
  <p>{{ $store.state.name }}</p>
  <p>{{ $store.state.age }}</p>
  <p>{{ $store.getters.BMI }}</p>
</template>
```

就为了获取一个值，而写一串这么长的代码，不够优雅。因此，一个解决方案是使用计算属性，使用如下：

```html
<template>
  <p>{{ name }}</p>
  <p>{{ age }}</p>
  <p>{{ BMI }}</p>
</template>
```
```javascript
export default {
  computed: {
    name(){
      return this.$store.state.name;
    },
    age(){
      return this.$store.state.age;
    },
    BMI(){
      return this.$store.getters.BMI;
    }
  }
}
```
这样写，虽然template里面写法简洁了，但是如果另一个组件也需要这些数据，那computed里面的代码任然需要重新复制一份，造成了代码冗余。那如何解决呢？**使用mapState/mapGetters**。

### 2. mapState/mapGetters的使用
mapState/mapGetters都是为了方便使用Vuex状态管理中的state和getters数据而进行的映射api。用法如下：
```html
<template>
  <p>{{ name }}</p>
  <p>{{ age }}</p>
  <p>{{ BMI }}</p>
</template>
```
```javascript
export default {
  computed: {
    localComputed() {/* 其它计算属性 */},
    ...mapState(['name', 'age']),
    ...mapGetters(['BMI']),
  }
}
```
> 这里为了说明问题，只是展示了使用`字符串`的写法，其他如对象，或者函数写法，可以去查阅官网。

### 3. mapState/mapGetters在Vue3的composition API的使用与存在的问题
为了在composition API中方便使用，仍然可以使用计算属性来简化代码，方式如下：
```html
<template>
  <p>{{ name }}</p>
  <p>{{ age }}</p>
  <p>{{ BMI }}</p>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const name = computed( () => store.state.name)
  const age = computed( () => store.state.age)
  const BMI = computed( () => store.getters.BMI)
</script>
```
这样写也能达到上面options API使用计算属性来做的相同功效，但state/getters里的属性值仍然是一个一个取出来的，也会有代码重复和冗余。为了解决这个问题，希望能像options API里使用mapState/mapGetters后一样方便获取state/getters里的属性，可以在composition API同样里使用mapState/mapGetters来优化。

但是，在composition API 里使用 mapState/mapGetters前，需要理解 mapState/mapGetters 返回的到底是什么？

**mapState/mapGetters 返回的都是一个一个对应属性的函数。**

如果直接像下面这样使用，会报 `this.$store undefined` 错误，因为找不到`this`：
```html
<template>
  <p>{{ computedStore.name }}</p>
  <p>{{ computedStore.age }}</p>
</template>

<script>
  import { computed } from 'vue';
  import { mapState } from 'vuex';

  const computedStore = computed({...mapState(['name', 'age'])})
</script>
```

**正确的做法：**
```html
<template>
  <p>{{ storeState.name }}</p>
  <p>{{ storeState.age }}</p>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore, mapState } from 'vuex';

  const store = useStore();

  const storeStateFn = mapState(['name', 'age']);

  const storeState = {};

  Object.keys(storeStateFn).forEach(fnKey => {
    const fn = storeStateFn[fnKey].bind({$store: store});  
    storeState[key] = computed(fn);
  })
</script>
```
同理，使用`mapGetters`时，也可以这样写。但此时代码没有封装。如果在其他地方用，又是一顿拷贝，不够优雅。下面开始讲封装。

### 3. 在composition API中对这mapState/mapGetters进行封装

**首先，对其中一种(mapState)进行封装**

```javascript
import { computed } from 'vue';
import { useStore, mapState } from 'vuex';

function useState(mapper) {
  // 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeStateFns = mapState(mapper);

  // 对数据进行转换
	const storeState = {};
	Object.keys(storeStateFns).forEach((fnKey) => {
		const fn = storeStateFns[fnKey].bind({ $store: store });
		storeState[fnKey] = computer(fn);
	});

	return storeState;
}
```

**然后，封装另一个(mapGetters)**

通过上述封装和分析，因为就一个API不同，因此有以下两种简单的封装思路：

第一种，直接另外再写一个`useGetters`：
```javascript
import { computed } from 'vue';
import { useStore, mapGetters } from 'vuex';

function useState(mapper) {
  // 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeGettersFns = mapGetters(mapper);

  // 对数据进行转换
	const storeGetters = {};
	Object.keys(storeGettersFns).forEach((fnKey) => {
		const fn = storeGettersFns[fnKey].bind({ $store: store });
		storeGetters[fnKey] = computer(fn);
	});

	return storeGetters;
}

```
第二种，将上述两个分开封装的函数合为一个，具体用哪一种，由调用者传参决定，代码如下：
```javascript
import { computed } from 'vue';
import { useStore, mapState, mapGetters } from 'vuex';

function useState(mapper, mapFn) {
  // 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeDateFns = mapFn(mapper);

  // 对数据进行转换
	const storeDate = {};
	Object.keys(storeDateFns).forEach((fnKey) => {
		const fn = storeDateFns[fnKey].bind({ $store: store });
		storeDate[fnKey] = computer(fn);
	});

	return storeDate;
}
```

> 以上两者都是不错的封装，但各自也存在一些问题。例如：第一种在调用时很明确，但是有代码冗余；第二种在调用时，有可能会因调用者不熟悉参数，从而造成bug。

那该如何封装呢？可以将核心处理逻辑抽离，然后分别对`mapState/mapGetters`进行封装：

```javascript
import { computed } from 'vue';
import { useStore, mapState, mapGetters } from 'vuex';

/* 抽离核心逻辑 */
function useMapper(mapper, mapFn){
  // 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeDateFns = mapFn(mapper);

  // 对数据进行转换
	const storeDate = {};
	Object.keys(storeDateFns).forEach((fnKey) => {
		const fn = storeDateFns[fnKey].bind({ $store: store });
		storeDate[fnKey] = computed(fn);
	});

	return storeDate;
}

// 封装 mapState
function useState(mapper) {
  return useMapper(mapper, 'mapState');
}

// 封装 mapGetters
function useGetters(mapper) {
  return useMapper(mapper, 'mapGetters');
}
```

### 4. 封装后文件组织规范
上一节对`mapState/mapGetters`进行了良好的封装，但是是写在一个文件中。如果为了内容组织清晰，还可以对上述封装进行分文件组织，组织方式可如当前目录下的 [`hooks`目录](./hooks/)。


### 5. 多模块store封装的完善
上面的封装，都是针对项目里只有一个store模块的情况，但是随着项目的复杂度增加，就有必要在项目中对store进行多个模块划分，那上述封装就不能适应这种情况了。为此，需要进行完善，可以借助[`createNamespaceHelpers`](https://vuex.vuejs.org/zh/api/#createnamespacedhelpers)这个API，它接收一个`moduleName`，返回对应module的map系列函数对象。

**完善后的代码：**

```javascript
import { computed } from 'vue';
import { useStore, mapState, mapGetters, createNamespaceHelpers } from 'vuex';

/* 抽离核心逻辑 */
function useMapper(mapper, mapFn){
  // 拿到store实例
	const store = useStore();

	// 获取到对应对象的function
	const storeDateFns = mapFn(mapper);

  // 对数据进行转换
	const storeDate = {};
	Object.keys(storeDateFns).forEach((fnKey) => {
		const fn = storeDateFns[fnKey].bind({ $store: store });
		storeDate[fnKey] = computed(fn);
	});

	return storeDate;
}

// 封装 mapState
function useState(moduleName, mapper) {
  let mapFn = mapState;
  
  // 判断是否是其它模块
  if(typeof moduleName === 'string' && moduleName.length > 0){
    mapFn = createNamespaceHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapFn);
}

// 封装 mapGetters
function useGetters(moduleName, mapper) {
  let mapFn = mapGetters;
  
  // 判断是否是其它模块
  if(typeof moduleName === 'string' && moduleName.length > 0){
    mapFn = createNamespaceHelpers(moduleName).mapGetters
  }
  return useMapper(mapper, mapFn);
}
```
