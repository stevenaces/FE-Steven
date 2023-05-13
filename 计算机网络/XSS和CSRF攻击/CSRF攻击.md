> [B站up讲解CSRF](https://www.bilibili.com/video/BV1iW411171s/?spm_id_from=333.788.recommend_more_video.2&vd_source=2dd02d64c29ab7eefcc5106eb9b51955)

## CSRF 攻击

不法分子获取用户的登录状态信息，通过伪造一些恶意请求，从而使用户利益受损。

两个要求：
- 用户登录的站点A
- 在A站点没有登出的情况下访问了恶意站点B，B拿到用户在A站点的表示用户登录转态信息，然后构造恶意请求，危害用户利益。

#### 常见防御方式
- 重要请求尽量使用`POST`
- 增加`验证码`，例如复杂验证码、手机验证码，确保是真实用户在发起这次请求。
- 使用请求头的`Referer`字段，记录源请求域名
- 使用 Anti CSRF Token：在重要请求（如表单）中加入csrf-token信息，这个信息是服务端赋予的，并且也是服务端验证的；需要保证csrf-token的随机性；
- 自定义一些Header请求头