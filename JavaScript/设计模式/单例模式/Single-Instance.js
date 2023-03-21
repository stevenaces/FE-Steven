class SingleInstance {
	constructor() {}

	static Instance() {
		if (!SingleInstance._instance) {
			Object.defineProperty(SingleInstance, "_instance", {
				value: new SingleInstance(),
				configurable: true,
				enumerable: false,
				writable: true,
			});
		}
		return SingleInstance._instance;
	}
}

module.exports = SingleInstance.Instance();
