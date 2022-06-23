# h5Editor

h5Editor,一个基于标准文档流的h5页面编辑器。不同于使用`绝对定位`布局的方式，h5Editor使用了标准的文档流进行布局，
组件之间父子级关系一目了然。同样使得整块拖拽变得更为方便快捷，`组件锁定/解锁`亦是如此（只需要锁定父容器，该容器下所有组件均被锁定）

目前h5Editor内有8个[组件](#组件)可供使用，其中4个基础组件，集成4个[Vant（有赞）](https://youzan.github.io/vant/#/zh-CN) 组件，满足基本业务场景


### Demo


### 运行

```
yarn install
yarn front-serve # 启动前端工程
yarn nodemon # 启动后端工程
```

### 部署
 1. 构建预览器  `npm run build-previewer`
 2. 构建服务端 `npm run build-server`
 3. 构建前端 `npm run build`

执行上述命令后会得到`./dist`前端代码，`./server/build`后端代码（预览器构建后存放在后端）

#### 前端部署

直接将打包后得到的`dist`目录放到`nginx`或其它服务器中

#### 后端部署
将打包后的`build`目录上传服务器

`npm install --production` 安装依赖

- 使用pm2启动 `pm2 start processes.json`，此方式需要安装 [pm2](https://github.com/Unitech/pm2)  `npm i -g pm2`
- 直接启动 `node index.js` 



### 其它命令

```shell
yarn build-server # 构建服务端代码
yarn back-server # 启动后端服务器
yarn nodemon # 启动后端服务器（开发环境下监听ts文件变动并重启node服务）
yarn build-previewer # 构建预览器
```


### 前端

前端采用`vue3`+`typescript`开发

### 组件

#### 内置组件
- `Component`：所有小组件的基类，开发组件需要继承它
- `ComponentWrapper`：用来包裹组件，实现了点击、拖拽、缩放的功能性组件。任何组件都需要包裹在其中
- `Container`：容器组件，类似于`div`。
- `Button`:按钮
- `Img`:图片
- `Text`:文本

#### 集成三方组件(Vant)

- `NvaBar`:标题/导航栏
- `NoticeBar`:通知栏
- `Swiper`:轮播
- `Tab`:标签页组件

### 后端

后端采用 [Express](https://expressjs.com/) 作为框架， 数据库采用`nedb`的Promise版本 [nedb-promises](https://github.com/bajankristof/nedb-promises) 。 数据以文件方式存在本地


