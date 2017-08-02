# vue-spa-project
> 基于vue.js技术栈，采用MVC等分层结构设计、数据解耦设计、组件化和自动化构建的单页应用项目。

技术栈

- vue.js（2.4）
- vuex（状态管理）
- vue-router（前端路由，异步加载）
- fetch（替代ajax，更高效地进行网络请求）
- element-ui（基于vue的PC端UI组件库）


Webpack（自动构建）

- Babel预编译（ES6、SCSS等），和异步组件实现路由懒加载
- ESlint代码质量控制，所有代码编写必须按照标准规范才能通过编译，并避免一些低级错误
- 本地开发服务器会监听文件修改，自动编译和刷新浏览器
- 前端mock数据，无需等待后端接口实现
- 测试服务器自动部署deploy（需要在服务器上启动一个node写的接收脚本: [file-receiver](https://github.com/xiaoping6688/file-receiver)）

如果需要服务端渲染(SSR)，推荐使用：[NUXT](https://zh.nuxtjs.org/)

## Build Setup

``` bash
# install dependencies (use cnpm: npm install -g cnpm --registry=https://registry.npm.taobao.org)
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run all tests for unit test and e2e test
npm test

# check update for npm packages, please install 'npm install npm-check-updates -g' at first
npm run update
```

![image](https://raw.githubusercontent.com/xiaoping6688/vue-spa-project/master/static/img/screenshot.png)
