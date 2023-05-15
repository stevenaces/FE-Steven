const fs = require('fs')

function read(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(`./${filename}.md`, (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

async function main() {
	let files = ['为学', '插秧诗', '观书有感']
	let weixue = await read(files[0])
	let chayangshi = await read(files[1])
	let guanshu = await read(files[2])
	console.log(weixue.toString())
	console.log(chayangshi.toString())
	console.log(guanshu.toString())
}

main()

function fn() {
	let files = ['为学', '插秧诗', '观书有感']
	files.forEach((fileName) => {
		read(fileName).then(value => console.log(value.toString()));
	})
	// read(files[0]).then(value=>console.log(value.toString()))
	// read(files[1]).then(value=>console.log(value.toString()))
	// read(files[2]).then(value=>console.log(value.toString()))
}
// fn()