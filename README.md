## 前端部分启动项目

### 简介：

##### 目的：

搭建一个方便快速启动新需求开发的基本项目，在vue-cli的基础上添加一些适应自己项目的配置，最大限度的缩短项目启动的时间消耗。

##### 已实现功能：

在vue-cli的基础上，直接集成了项目可能用到的一些组件，如下：

- UI框架ElementUI
- vue-router的基本路由配置
- 项目通用工具，比如fetch请求包、通用样式。
- 方便配置的config文件，独立于整个项目，可以在打包完成后直接切换运行环境。
- 未完待续

##### 技术栈：

- 前端框架Vue@2.5.17
- UI框架ElementUI@2.4.5
- 路由工具Vur-router@3.0.1

### 用法：

##### 目录结构：

```javascript
|---src                   // 项目代码目录
     |---assets           // 静态资源
            |---css
            |---imgs
            |---js
     |---components       // vue公用组件目录
     |---plugins          // 项目所用插件目录
     |---views            // vue页面文件（一级页面）
           |---pages      // 二级路由页面
     |---config.js        // 项目整体配置，比如API接口（不参与webpack打包）
     |---main.js          // vue项目主入口
     |---router.js        // 路由配置文件
```

##### 初始用法：

首先从项目仓库中拉取项目：

```bash
git clone http://172.16.101.211/wangqingye/base-repo.git
```

**然后修改仓库地址到新项目并上传初始代码（这一步很重要）：**

```bash
git remote set-url origin newgit.git
git add .
git commit
git push -u origin master
```

接着就可以运行并开始开发：

```bash
npm run serve
```

