/* 原型链 */
function Super() {
	this.SuperFlag = true;
}

Super.prototype.getSuperFlagValue = function () {
	return this.SuperFlag;
};

function Sub() {
	this.SubFlag = false;
}

// Sub原型 继承 Super
Sub.prototype = new Super();

Sub.prototype.getSubFlagValue = function () {
	return this.SubFlag;
};

Sub.prototype.getSuperFlagValue = function () {
	return this.SuperFlag;
};

let instance = new Sub();

console.log(instance.getSubFlagValue());
console.log(instance.getSuperFlagValue());
