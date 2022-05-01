<p align="center">
  <img src="https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/github/robot-avatar.jpg" width="200" height="200" alt="QQRobot" style="border-radius: 50%">
</p>

<div align="center">

# QQRobot

_✨ 基于 [Mirai](https://github.com/mamoe/mirai) + [mirai-api-http](https://github.com/project-mirai/mirai-api-http) + [NestJS](https://github.com/nestjs/nest) 实现的一项 QQ 机器人项目✨_  


</div>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/STDSuperman/QQRobot" alt="license">
  <img src="https://img.shields.io/david/dev/STDSuperman/QQRobot?label=dependencies" alt="license">
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/Mrs4s/go-cqhttp/master/LICENSE">
    <img src="https://img.shields.io/github/license/Mrs4s/go-cqhttp" alt="license">
  </a>
  <img src="https://img.shields.io/github/package-json/dependency-version/STDSuperman/QQRobot/rxjs">
  <img src="https://img.shields.io/github/package-json/dependency-version/STDSuperman/QQRobot/@nestjs/common">
  <img src="https://img.shields.io/github/package-json/dependency-version/STDSuperman/QQRobot/@nestjs/websockets">
  <img src="https://img.shields.io/github/package-json/dependency-version/STDSuperman/QQRobot/winston">
</p>

## 🌴 概述

基于`Mirai`对`QQ`各项事件监听与收发功能，支持自定义组合操作`QQ`能力，同时借助`Mirai-Api-Http`封装提供`RESTful API`，实现对其他语言的支持。

## 💥 功能介绍

- [x] 多群消息转发互通，实现跨群聊天功能
- [x] 接入天行API，通过检测关键字实现诸如获取 *舔狗日记* 、 *彩虹屁*（一段文字）等
功能
- [x] 支持输入关键字实现群员投票踢人能力
- [x] 支持关键字搜索音乐能力

> 现已迁移到`mirai-api-http`的`2.x`版本，`1.x`版本[传送门](https://github.com/STDSuperman/QQRobot/tree/master-v1)

## ✨预览
<img src="https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/github/robot-preview-1.png" style="border: 1px solid #eee;padding: 5px;border-radius: 7px;box-shadow: 0 0 10px 1px #eee">

<img src="https://blog-images-1257398419.cos.ap-nanjing.myqcloud.com/github/music-support.png" style="border: 1px solid #eee;padding: 5px;border-radius: 7px;box-shadow: 0 0 10px 1px #eee">

## 🚀 开发手册

### 🐳 Docker 方式

**强烈推荐使用 Docker 方式！**： [Docker 方式安装环境](https://github.com/STDSuperman/QQRobot/blob/master/docs/docker-deploy.md)

> 如果采用手动方式，你会发现很麻烦。
### 🐌 手动方式
整体环境依赖于`Mirai`，故首先需要安装相关环境提供`QQ`托管能力。

#### 安装 Mirai 环境

> 当前项目依赖 `mirai-api-http` 版本为 2.x

1. 安装`Mirai Console Loader`：[相关安装地址](https://github.com/iTXTech/mirai-console-loader)。

建议优先尝试他的手动安装方式
> 这里笔者采用它提供的自动安装方式未成功，故采用的手动方式，如果自动安装不行，建议采用手动安装，手动安装的话会需要你安装一个大于11的[JDK](http://jdk.java.net/archive/)，这里建议采用开源版本的。
2. 使用`Mirai Console Loader`安装[mirai-api-http](https://github.com/project-mirai/mirai-api-http)插件。

在当前安装路径下启动终端并中执行以下命令
```shell
./mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin
```

***重要 !!!***

==========>

如果上面步骤2安装的`mirai-api-http`版本最终是`1.x`，那么这里你可以在当前目录下把`plugins`里内容都删掉，然后手动下载这个包[mirai-api-http@2.x](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.0.2)，放置到`plugins`目录下。

然后记得在终端里执行
```shell
./mcl --disable-script updater
```

这个是用来禁用`mcl`的自动更新的，因为目前观察来看每次启动会自动下载`1.x`版本，导致启动出现问题。

> 如果这个问题已经修复了就当我没说。。。。

==========>

执行完毕之后你可以通过执行`./mcl`命令直接启动，看`mirai`环境是否正常启动成功。

相关`API`地址：[mirai-api-http API 文档](https://project-mirai.github.io/mirai-api-http/)
> 这里主要是因为笔者服务端采用`Nodejs`环境进行开发，故需要该插件提供`RESTful`接口与`websocket`连接与`QQ`通信。
#### 配置`mirai-api-http`全局配置：

1. 按照官方文档在`Mirai Console Loader`安装目录下找到相关配置文件：`config/MiraiApiHttp(名字不一定叫这个，不过目录名一表示的含义是mirai-api-http的)/setting.yml` (没有则自行创建)
2. 配置端口为`9999`（因为笔者项目指定的端口为这个，如果这里想自定义或者用系统默认的`8080`，则你需要将笔者项目 `src/config/index.ts` 文件中的`BOT_SERVER_PORT`改成你这里设置的端口）
3. 修改`verifyKey`，或不修改，同时复制这个`verifyKey`，后续在笔者项目`src/config/index.ts`中`VERIFY_KEY`指定为这个

> 这里的`src/config/index.ts`主要用于一些全局配置项，克隆项目后可以进行查看修改。

这样差不多笔者准备需要你配置的地方改好了，其他如果需要自己自主定义的就按照官方文档自行修改，相应的也可能需要修改`config/index.ts`中配置。

##### 配置文件示例
> 笔者的文件目录为：`config\net.mamoe.mirai-api-http\setting.yml`
```yml
## 配置文件中的值，全为默认值

## 启用的 adapter, 内置有 http, ws, reverse-ws, webhook
adapters:
  - http
  - ws

## 是否开启认证流程, 若为 true 则建立连接时需要验证 verifyKey
## 建议公网连接时开启
enableVerify: true
verifyKey: 1234567890

## 开启一些调式信息
debug: false

## 是否开启单 session 模式, 若为 true，则自动创建 session 绑定 console 中登录的 bot
## 开启后，接口中任何 sessionKey 不需要传递参数
## 若 console 中有多个 bot 登录，则行为未定义
## 确保 console 中只有一个 bot 登陆时启用
singleMode: false

## 历史消息的缓存大小
## 同时，也是 http adapter 的消息队列容量
cacheSize: 4096

## adapter 的单独配置，键名与 adapters 项配置相同
adapterSettings:
  ## 详情看 http adapter 使用说明 配置
  http:
    host: localhost
    port: 9999
    cors: [*]
  
  ## 详情看 websocket adapter 使用说明 配置
  ws:
    host: localhost
    port: 9999
    reservedSyncId: -1

```

#### 音乐搜索功能插件安装

若需要开启音乐搜索能力，请按照[音乐插件文档](https://github.com/khjxiaogu/MiraiSongPlugin)下载插件放置到`plugins`目录下。
#### redis & mysql

本项目需要依赖`redis`与`mysql`环境，故需要你安装并启动`redis`和`mysql`服务。

同时在下面提到的`.env`文件中添加数据库配置`DATABASE_URL`

#### 启动

1. 启动`MCL`（上面安装的）。
2. 输入登录指令，将一个用于机器人的`QQ`号进行登录。

在上述步骤都完成之后，你需要安装的东西基本完毕了，可以启动本项目进行进一步服务端开发了。

#### 克隆（下载）项目

```bash
git clone git@github.com:STDSuperman/QQRobot.git
```

#### 项目配置

> `src/config/index.ts`文件中包含的配置以及含义请打开该文件查看注释部分。

除了前面提到的需要修改`src/config/index.ts`配置之外，你需要在当前项目根目录下新建一个`.env`文件，用于配置一些私密数据，具体值如下：

```env
TIAN_API_KEY=xxx
QQAccount=xxx
QQPassword=xxx
SERVER_HOST=xxx
DATABASE_URL=mysql://root:password@localhost:3306/QQROBOT
```

##### 配置介绍

| 配置项       | 相关介绍                                                     |                                               |
| ------------ | ------------------------------------------------------------ | --------------------------------------------- |
| TIAN_API_KEY | 天行API申请的`KEY`，需要你在[官网](https://www.tianapi.com/)进行申请，与此同时，你还需要申请[舔狗日记](https://www.tianapi.com/apiview/180)、[彩虹屁](https://www.tianapi.com/apiview/181)等天行`API`应用，都是免费的。 | 必填。否则无法使用相关`API`                   |
| QQAccount    | 你登录的用作机器人的`QQ`账号                                 | 必填。 |
| QQPassword   | 你登录的机器人密码                                           | 可选。（目前使用该配置的功能`mirai`暂未支持） |
| SERVER_HOST  | 你登录的`mirai`服务地址（如果本机就`127.0.0.1`或`localhost`即可） | 必填。                                        |

> 项目中需要引入机器人的群，需要预先将机器人账号设为管理员，否则投票踢人功能会存在异常。

#### 项目启动

进入克隆后的项目，执行安装命令，安装完毕之后执行启动命令。
##### 使用npm

```shell
npm i
npm run start
```

##### 使用yarn

```shell
yarn
yarn start
```
