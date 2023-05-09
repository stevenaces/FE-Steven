const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
	console.log("有人连接进来了");

	ws.on("message", (data) => {
		ws.send(data + "举头望明月，低头思故乡");
	});

	ws.on("close", () => {
		console.log("有人离开了");
	});
});
