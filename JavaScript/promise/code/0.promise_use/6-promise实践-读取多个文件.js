// 引入
const fs = require('fs')

// 回调地狱式写法
// fs.readFile('./resource/为学.md', (err, data1)=>{
//     fs.readFile('./resource/观书有感.md', (err, data2)=>{
//         fs.readFile('./resource/插秧诗.md', (err, data3)=>{
//             let result = data1 + "\r\n" + data2 + "\r\n" + data3
//             console.log(result)
//         })
//     })
// })

let p = new Promise((resolve, reject) => {
	fs.readFile('./为学.md', (err, data) => {
		resolve(data)
	})
})

p.then(value => {
	return new Promise((resolve, reject) => {
		fs.readFile('./观书有感.md', (err, data) => {
			resolve([value, data])
		})
	})
}, err => { })
	.then(value => {
		return new Promise((resolve, reject) => {
			fs.readFile('./插秧诗.md', (err, data) => {
				resolve([value, data])
			})
		})
	}, err => { })
	.then(value => {
		console.log(value.join(''))
	}, err => { })