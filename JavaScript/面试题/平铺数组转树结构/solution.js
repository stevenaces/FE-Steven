// 转自 https://juejin.cn/post/7210314492412969020
const nodes = [
	{ id: 1, parentId: null },
	{ id: 2, parentId: 1 },
	{ id: 3, parentId: 1 },
	{ id: 4, parentId: 2 },
	{ id: 5, parentId: 3 },
	{ id: 6, parentId: 3 },
	{ id: 7, parentId: 4 },
	{ id: 8, parentId: 4 },
];

const res = [
	{
		id: 1,
		parentId: null,
		children: [
			{
				id: 2,
				parentId: 1,
				children: [
					{
						id: 4,
						parentId: 2,
						children: [
							{ id: 7, parentId: 4, children: [] },
							{ id: 8, parentId: 4, children: [] },
						],
					},
				],
			},
			{
				id: 3,
				parentId: 1,
				children: [
					{ id: 5, parentId: 3, children: [] },
					{ id: 6, parentId: 3, children: [] },
				],
			},
		],
	},
];

/* 方法一、使用递归 */
function arrToTreeRec(nodes, parentId) {
	return nodes
		.filter((node) => node.parentId === parentId)
		.map((node) => ({ ...node, children: arrToTreeRec(nodes, node.id) }));
}

const treeRec = arrToTreeRec(nodes, null);
// console.log(JSON.stringify(treeRec));
const treeRecStr = JSON.stringify(treeRec);

/* 方法二、使用循环 */
function arrToTreeLoop(nodes) {
	const map = {};
	const tree = [];

	for (let node of nodes) {
		map[node.id] = { ...node, children: [] };
	}

	for (const node of Object.values(map)) {
		if (node.parentId === null) {
			tree.push(node);
		} else {
			map[node.parentId].children.push(node);
		}
	}
	return tree;
}

const treeLoop = arrToTreeRec(nodes, null);
console.log(JSON.stringify(treeLoop) === treeRecStr);

/* 方法三、使用哈希 */
function arrToTreeHash(nodes) {
	const map = new Map(
		nodes.map((node) => [node.id, { ...node, children: [] }])
	);

	const tree = [];

	for (let node of map.values()) {
		if (node.parentId === null) {
			tree.push(node);
		} else {
			map.get(node.parentId).children.push(node);
		}
	}

	return tree;
}

const treeHash = arrToTreeHash(nodes, null);
console.log(JSON.stringify(treeHash) === treeRecStr);
