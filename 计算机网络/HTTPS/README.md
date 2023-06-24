## HTTPS 协议
> 强烈推荐阅读 [阮一峰HTTPS专题](https://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html)
> 
> 也可查看 [技术蛋老师讲解](https://www.bilibili.com/video/BV1KY411x7Jp/?spm_id_from=333.337.search-card.all.click&vd_source=2dd02d64c29ab7eefcc5106eb9b51955)

理解HTTPS的安全性，要先了解`SSL/TSL协议`。

TSL1.2

三次握手后，先使用`非对称加密算法`获取`会话密钥`，然后开始使用`对称加密`通过`会话密钥`进行加解密通信。