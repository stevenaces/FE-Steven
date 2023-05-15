// 1. 引入 fs 模块
const fs = require('fs')

// 2. 调用方法读取文件
// fs.readFile('./resource/为学.md', (err, data)=>{
//     // 如果失败
//     if(err) throw err
//     // 如果没有出错
//     console.log(data.toString())
// })

// 3. 使用 Promise
let p = new Promise((resolve, reject) => {
	fs.readFile('./resource/为学.md', (err, data) => {
		// 如果失败
		if (err) reject(err)
		// 如果成功
		resolve(data)
	})
})

// p.then(function(value){
//     console.log(value.toString())
// }, function(err){
//     console.log(err)
// })

p.then(function (value) {
	console.log(value.toString())
}, function (err) {
	console.log(err)
})