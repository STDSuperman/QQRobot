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

## 概述

基于`Mirai`对`QQ`各项事件监听与收发功能，支持自定义组合操作`QQ`能力，同时借助`Mirai-Api-Http`封装提供`RESTful API`，实现对其他语言的支持。

## 功能介绍

- [x] 多群消息转发互通，实现跨群聊天功能
- [x] 接入天行API，通过检测关键字实现诸如获取 *舔狗日记* 、 *彩虹屁*（一段文字）等
功能
- [x] 支持输入关键字实现群员投票踢人能力

> 更多功能正在持续开发中...

## 🚀 开发手册

### 环境准备
整体环境依赖于`Mirai`，故首先需要安装相关环境提供`QQ`托管能力。

#### 安装 Mirai 环境

> 当前项目依赖 `mirai-api-http` 版本为 1.x

1. 安装`Mirai Console Loader`：[相关安装地址](https://github.com/iTXTech/mirai-console-loader)。
> 这里笔者采用它提供的自动安装方式未成功，故采用的手动方式，如果自动安装不行，建议采用手动安装，手动安装的话会需要你安装一个大于11的JDK，这里建议采用开源版本的。
2. 使用`Mirai Console Loader`安装[mirai-api-http](https://github.com/project-mirai/mirai-api-http)插件。
```shell
mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin
```

相关`API`地址：[mirai-api-http API 文档](https://project-mirai.github.io/mirai-api-http/)
> 这里主要是因为笔者服务端采用`Nodejs`环境进行开发，故需要该插件提供`RESTful`接口与`websocket`连接与`QQ`通信。
#### 配置`mirai-api-http`全局配置：

1. 按照官方文档在`Mirai Console Loader`安装目录下找到相关配置文件：`config/MiraiApiHttp(名字不一定叫这个，不过目录名一表示的含义是mirai-api-http的)/setting.yml` (没有则自行创建)
2. 配置端口为`9999`（因为笔者项目指定的端口为这个，如果这里想自定义或者用系统默认的`8080`，则你需要将笔者项目 ==src目录下的config文件夹中index.ts文件== 中的`BOT_SERVER_PORT`改成你这里设置的端口）
3. 修改`authKey`，或不修改，同时复制这个`authKey`，后续在笔者项目`src/config/index.ts`中`AUTH_KEY`指定为这个
4. 将`enableWebsocket`设置为`true`
5. 将`heartbeat`中`enable`设置为`true`

> 这里提到的配置文件位于：`src/config/index.ts`，克隆项目后可以进行查看修改。

这样差不多笔者准备需要你配置的地方改好了，其他如果需要自己自主定义的就按照官方文档自行修改，相应的也可能需要修改`config/index.ts`中配置。

##### 配置文件示例
> 笔者的文件目录为：`config\net.mamoe.mirai-api-http\setting.yml`
```yml
cors: 
  - '*'
host: 0.0.0.0
port: 9999
authKey: 000000000
cacheSize: 4096
enableWebsocket: true
report: 
  enable: false
  groupMessage: 
    report: true
  friendMessage: 
    report: true
  tempMessage: 
    report: true
  eventMessage: 
    report: true
  destinations: []
  extraHeaders: {}

heartbeat: 
  enable: true
  delay: 1000
  period: 15000
  destinations: []
  extraBody: {}

  extraHeaders: {}

```

#### redis

本项目需要依赖`redis`环境，故需要你安装并启动`redis`服务。

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
```

##### 配置介绍

| 配置项       | 相关介绍                                                     |                                               |
| ------------ | ------------------------------------------------------------ | --------------------------------------------- |
| TIAN_API_KEY | 天行API申请的`KEY`，需要你在[官网](https://www.tianapi.com/)进行申请，与此同时，你还需要申请[舔狗日记](https://www.tianapi.com/apiview/180)、[彩虹屁](https://www.tianapi.com/apiview/181)等天行`API`应用，都是免费的。 | 必填。否则无法使用相关`API`                   |
| QQAccount    | 你登录的用作机器人的`QQ`账号                                 | 可选。（目前使用该配置的功能`mirai`暂未支持） |
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
