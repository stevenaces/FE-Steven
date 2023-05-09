## websocket协议

`http`是一个基本的web网络协议，存在的问题有：
- One-way, 
- request/response, 
- stateless, 
- Half-Duplex-protocol


### 协议类型
- `ws`
- `wss`

### 连接过程
客户端请求头 字段：
- `Connection`: upgrade
- `Upgrade`: websocket
- `Sec-Websocket-Key`: （用于服务端验证是否收到一个有效的websocket请求）
- `Sec-Websocket-Version`: （升级的版本号）

服务端响应 字段：
- `101 Switching Protocols`
- `Connection`: Upgrade
- `Upgrade`: websocket
- `Sec-Websocket-Accept`:

### 客户端常用 API
- WebSocket('xxx'):
- ws.readState: CONNECTING | OPEN | CLOSING | CLOSED
- ws.onopen
- ws.onsend
- ws.onmessage
- ws.onclose
- ws.onerror

### 心跳机制实现【待填】




> 等多资料待参考和总结：
- [B站技术蛋老师](https://www.bilibili.com/video/BV1n3411u7uf/?spm_id_from=autoNext&vd_source=2dd02d64c29ab7eefcc5106eb9b51955)：简单了解websocket，简单使用websocket的demo，使用[socket.io](https://github.com/socketio/socket.io)库实现一个简单的实时聊天页面。
- [阮一峰websocket教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)：比较详细的介绍了websocket协议，以及一些参考资料。