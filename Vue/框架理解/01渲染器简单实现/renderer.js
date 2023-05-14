// h(
// 	"div",
// 	{
// 		class: "box",
// 		onClick: (e) => {
// 			console.log(e);
// 		},
// 	},
// 	"这是div内容"
// );

const h = (tag, props, children) => {
	// vnode -> JavaScript对象 {}
	return { tag, props, children };
};

/**
 *  将 vnode 挂载到 容器上
 * @param {*} vnode 经过 h() 生成的 vnode 对象
 * @param {*} container 真实 DOM 挂载点
 */
const mount = (vnode, container) => {
	// vnode -> element
	// 1. 创建出真实的DOM元素，并且保留在vnode上
	const el = (vnode.el = document.createElement(vnode.tag));

	// 2. 处理 props
	if (vnode.props) {
		for (const key in vnode.props) {
			const value = vnode.props[key];

			if (key.startsWith("on")) {
				// 对事件监听的判断
				el.addEventListener(key.slice(2).toLowerCase(), value);
			} else {
				el.setAttribute(key, value);
			}
		}
	}

	// 3. 处理 children
	if (vnode.children) {
		if (typeof vnode.children === "string") {
			el.textContent = vnode.children;
		} else {
			vnode.children.forEach((item) => {
				mount(item, el);
			});
		}
	}

	// 4. 将el挂载到container上
	container.appendChild(el);
};

/**
 * 新旧对比，简单的 diff 算法
 * @param {*} n1 oldVnode
 * @param {*} n2 newVnode
 */
const patch = (n1, n2) => {
	// 比较vnode 元素类型
	if (n1.tag !== n2.tag) {
		const n1ElParent = n1.el.parentElement;
		n1ElParent.removeChild(n1.el);
		mount(n2, n1ElParent);
	} else {
		// 1. 取出element对象，并且在n2中进行保存
		const el = (n2.el = n1.el);

		/* 2. 处理 props */
		const oldProps = n1.props || {};
		const newProps = n2.props || {};
		// 2.1 获取所有的newProps添加到el
		for (const key in newProps) {
			const oldValue = oldProps[key];
			const newValue = newProps[key];
			if (oldValue !== newProps) {
				if (key.startsWith("on")) {
					// 对事件监听的判断
					el.addEventListener(key.slice(2).toLowerCase(), newValue);
				} else {
					el.setAttribute(key, newValue);
				}
			}
		}
		// 2.2 删除旧 props
		for (const key in oldProps) {
			if (key.startsWith("on")) {
				// 对事件监听的判断
				const value = oldProps[key];
				if (key.startsWith("on")) {
					// 对事件监听的判断
					el.addEventListener(key.slice(2).toLowerCase(), value);
				} else {
					el.setAttribute(key, value);
				}
			}
		}

		/* 3. 处理 children */
		const oldChildren = n1.children || [];
		const newChildren = n2.children || [];

		if (typeof newChildren === "string") {
			// 情况一: newChildren本身是一个string
			// 边界情况 (edge case)
			if (typeof oldChildren === "string") {
				if (newChildren !== oldChildren) {
					el.textContent = newChildren;
				}
			} else {
				el.innerHTML = newChildren;
			}
		} else {
			// 情况二: newChildren本身是一个数组
			if (typeof oldChildren === "string") {
				el.innerHTML = "";
				newChildren.forEach((item) => {
					mount(item, el);
				});
			} else {
				// oldChildren: [v1, v2, v3, v8, v9]
				// newChildren: [v1, v5, v6]

				// 1.前面有相同节点的原生进行patch操作
				const commonLength = Math.min(oldChildren.length, newChildren.length);
				for (let i = 0; i < commonLength; i++) {
					patch(oldChildren[i], newChildren[i]);
				}

				// 2.newChildren.length > oldChildren.length
				if (newChildren.length > oldChildren.length) {
					newChildren.slice(commonLength).forEach((item) => {
						mount(item, el);
					});
				}

				// 3.newChildren.length < oldChildren.length
				if (newChildren.length < oldChildren.length) {
					oldChildren.slice(commonLength).forEach((item) => {
						el.removeChild(item.el);
					});
				}
			}
		}
	}
};
