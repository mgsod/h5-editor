# h5Editor

h5Editor,一个h5页面编辑器。不同于使用`绝对定位`布局的方式，h5Editor使用了标准的文档流进行布局，减少关联组件之间定位所需要的各种计算，
使得组件之间父子级关系一目了然，整块操作（拖拽、锁定/解锁、统一样式设置）更为方便。使用h5Editor，只需稍加熟悉，你便你能像专业前端开发者那样
得心应手，创建出你想要的精美页面

目前h5Editor内有8个[组件](#组件)可供使用，其中4个基础组件，集成4个[Vant（有赞）](https://youzan.github.io/vant/#/zh-CN) 组件，满足基本业务场景

### 特点
- 所见即所得 h5Editor抽离了`"解析器"`组件，编辑和预览都是通过它解析，所以编辑器里是什么样，结果就是什么样
- 自定义组件 当你需要在不同页面频繁拖拽一个相同或者大致相同的组件时，可以右键选择`做成组件`功能，让该组件成为自定义组件，此后可以在左侧列表中拖拽复用，拒绝重复操作
- 样式继承 由于使用了标准文档流，你可以通过一个容器（div)组件预先设置好样式，其内部组件样式会默认继承该组件样式，拒绝重复操作
- 一键预览 右侧工具栏中点击`预览`可随时查看页面效果
- 自适应布局 预览器内部通过计算，将编辑时得到的`px`像素，转化为可自适应的`rem`单位，实现不同分辨率端自适应
- 扫描豁链接查看/分享 在文档库页面，可以通过扫码或访问链接的方式进行查看或分享

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


