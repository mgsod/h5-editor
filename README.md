# h5Editor

### 基于标准文档流的h5页面编辑器

### 运行

```
yarn install
yarn front-serve # 启动前端工程
yarn nodemon # 启动后端工程
```

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


