

## 快速上手

### 启动前置环境

首先拉取当前仓库，然后在项目根目录依次执行以下步骤。

#### 启动 docker 容器

`docker-compose up`（启动依赖环境）

#### 准备登录环境

首先执行 `docker ps`，找到 qqrobot_app 容器的 CONTAINER ID，e.g:

```shell
~/Documents/MyCode/Node/QQRobot (docker-deploy*) » docker ps                                                   superman@B-P1W3Q05P-2227
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS       PORTS                               NAMES
c6463f34c700   qqrobot_app   "/bin/bash"              4 hours ago    Up 2 hours   0.0.0.0:9999->9999/tcp              qqrobot_app_1
ca6005536b2a   redis         "docker-entrypoint.s…"   5 hours ago    Up 2 hours   0.0.0.0:6379->6379/tcp              qqrobot_redis_1
1d4df79defeb   mysql:5.7     "docker-entrypoint.s…"   24 hours ago   Up 2 hours   0.0.0.0:3306->3306/tcp, 33060/tcp   qqrobot_mysql_1
```

这个时候我们可以执行以下命令进入容器：

`docker exec -it c6463f34c700  /bin/bash`

进入容器之后执行 `. /etc/profile`，这个是为了支持中文日志能力，如果不执行这个中文日志就会乱码。

接着执行 `./mcl` 命令，等待相关配置加载完成，末尾会出现一个 `>`，这个时候我们就可以执行登录操作了。


### 登录

输入 `/login` 指令进行登录，然后看日志中可能会出现 `Captcha link`，这个时候只需要复制链接到浏览器打开。

```shell
> /login QQ账号 QQ密码
```
滑动验证：
![滑动验证](https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/github/mirai-%E6%BB%91%E5%8A%A8%E9%AA%8C%E8%AF%81.png)

然后滑动滑块验证完之后，会有一个请求，把这个请求返回值里的 `ticket` 复制，接着打开控制台，粘贴到终端即可。

![接口](https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/docker/capture.png)

滑动验证完之后，可能会出现要求进一步验证的操作，同样的，复制链接，然后浏览器打开，扫码验证完毕就好了。

扫码验证：
![扫码验证](https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/github/mirai-%E6%89%AB%E7%A0%81.png)

然后手机扫码通过后再回个车应该就能看到：`Login successful`，这样就登录完成啦。


### 启动 QQRobot 项目

操作至此，你的前置最重要的一些步骤就完成了，接下来就是简单的启动项目就好了：

- `npm i`
- `npm run ps:gen`
- `npm run ps:push`
- `npm run start`

完事！


## 常见错误

如果你执行 `./mcl` 遇到了如下的错误：
```shell
Compiled method (c1)   32751 3078       3       jdk.internal.math.FormattedFloatingDecimal::valueOf (30 bytes)
 total in heap  [0x00000040143dbb10,0x00000040143dbf90] = 1152
 relocation     [0x00000040143dbc70,0x00000040143dbcc0] = 80
 main code      [0x00000040143dbcc0,0x00000040143dbe80] = 448
 stub code      [0x00000040143dbe80,0x00000040143dbed0] = 80
 metadata       [0x00000040143dbed0,0x00000040143dbed8] = 8
 scopes data    [0x00000040143dbed8,0x00000040143dbf28] = 80
 scopes pcs     [0x00000040143dbf28,0x00000040143dbf88] = 96
 dependencies   [0x00000040143dbf88,0x00000040143dbf90] = 8
Compiled method (c2)   32752 2886       4       java.util.regex.Pattern$BranchConn::match (11 bytes)
 total in heap  [0x000000401ba3a410,0x000000401ba3a748] = 824
 relocation     [0x000000401ba3a570,0x000000401ba3a598] = 40
 main code      [0x000000401ba3a5a0,0x000000401ba3a660] = 192
 stub code      [0x000000401ba3a660,0x000000401ba3a688] = 40
 metadata       [0x000000401ba3a688,0x000000401ba3a698] = 16
 scopes data    [0x000000401ba3a698,0x000000401ba3a6c8] = 48
 scopes pcs     [0x000000401ba3a6c8,0x000000401ba3a718] = 80
 dependencies   [0x000000401ba3a718,0x000000401ba3a720] = 8
 handler table  [0x000000401ba3a720,0x000000401ba3a738] = 24
 nul chk table  [0x000000401ba3a738,0x000000401ba3a748] = 16
Compiled method (c1)   32756 3028   !   3       sun.security.ssl.SSLSocketInputRecord::readFully (75 bytes)
 total in heap  [0x0000004014a8de90,0x0000004014a8eb00] = 3184
 relocation     [0x0000004014a8dff0,0x0000004014a8e0b0] = 192
 main code      [0x0000004014a8e0c0,0x0000004014a8e6e0] = 1568
 stub code      [0x0000004014a8e6e0,0x0000004014a8e760] = 128
 metadata       [0x0000004014a8e760,0x0000004014a8e770] = 16
 scopes data    [0x0000004014a8e770,0x0000004014a8e860] = 240
 scopes pcs     [0x0000004014a8e860,0x0000004014a8e9c0] = 352
 dependencies   [0x0000004014a8e9c0,0x0000004014a8e9c8] = 8
 handler table  [0x0000004014a8e9c8,0x0000004014a8ead0] = 264
 nul chk table  [0x0000004014a8ead0,0x0000004014a8eb00] = 48
#
# If you would like to submit a bug report, please visit:
#   https://bugreport.java.com/bugreport/crash.jsp
#
qemu: uncaught target signal 6 (Aborted) - core dumped
./mcl: 行 3:   131 已放弃               $JAVA_BINARY -jar mcl.jar $*
```

你只需要执行一下 `./mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin` ，然后再重新执行 `./mcl`启动即可。
