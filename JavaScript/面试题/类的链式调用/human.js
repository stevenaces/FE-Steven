class Human {
	constructor() {
		this.cbs = [];
		this.args = [];
	}

	_say(msg) {
		return new Promise((resolve, _) => {
			console.log(msg);
			resolve();
		});
	}

	say(msg) {
		this.cbs.push(this._say);
		this.args.push(msg);
		return this;
	}

	_sleep(wait) {
		return new Promise((resolve, _) => {
			for (let i = 1; i <= wait; i++) {
				setTimeout(function () {
					console.log(i);
					if (i === wait) resolve();
				}, i * 1000);
			}
		});
	}

	sleep(wait) {
		this.cbs.push(this._sleep);
		this.args.push(wait);
		return this;
	}

	async done() {
		for (let i = 0; i < this.cbs.length; i++) {
			await this.cbs[i](this.args[i]);
		}
	}
}
const human = new Human();

export default human;
