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

1. 安装`Mirai Console Loader`：[相关安装地址](https://github.com/iTXTech/mirai-console-loader)。
> 这里笔者采用它提供的自动安装方式未成功，故采用的手动方式，如果自动安装不行，建议采用手动安装，手动安装的话会需要你安装一个大于11的JDK，这里建议采用开源版本的。
2. 使用`Mirai Console Loader`安装[mirai-api-http](https://github.com/project-mirai/mirai-api-http)插件。
```shell
mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin
```

相关`API`地址：[mirai-api-http API 文档](https://project-mirai.github.io/mirai-api-http/)
> 这里主要是因为笔者服务端采用`Nodejs`环境进行开发，故需要该插件提供`RESTful`接口与`websocket`连接与`QQ`通信。
3. 启动`MCL`（上面安装的）。
4. 输入登录指令，将一个用于机器人的`QQ`号进行登录。

在上述步骤都完成之后，你需要安装的东西基本完毕了，可以启动本项目进行进一步服务端开发了。

#### 克隆（下载）项目

```bash
git clone git@github.com:STDSuperman/QQRobot.git
```

#### 项目启动
进入克隆后的项目，执行安装命令，安装完毕之后执行启动命令。
##### 使用npm
安装：
```shell
npm i
```
启动：
```shell
npm run start
```

##### 使用yarn
安装：
```shell
yarn
```
启动：
```shell
yarn start
```
