<div align="center">

# h5-editor

</div>

一个 h5 页面编辑器。不同于使用`绝对定位`布局的方式，h5-editor 使用了标准的文档流进行布局，减少关联组件之间定位所需要的各种计算，
使得组件之间父子级关系一目了然，整块操作（拖拽、锁定/解锁、统一样式设置）更为方便。使用 h5-editor，只需稍加熟悉，你便你能像专业前端开发者那样得心应手，创建出你想要的精美页面

> 目前 h5-editor 内有 8 个[组件](#组件)可供使用，其中 4 个基础组件，集成 4 个[Vant（有赞）](https://youzan.github.io/vant/#/zh-CN) 组件，满足基本业务场景

## 特点

- **所见即所得** - h5-editor 抽离了"解析器"组件，编辑和预览都是通过它解析，所以编辑器里是什么样，结果就是什么样
- **自定义组件** - 当你需要在不同页面频繁拖拽一个相同或者大致相同的组件时，可以右键选择`做成组件`功能，让该组件成为自定义组件，此后可以在左侧列表中拖拽复用，拒绝重复操作
- **样式继承** - 由于使用了标准文档流，你可以通过一个容器（div)组件预先设置好样式，其内部组件样式会默认继承该组件样式，拒绝重复操作
- **一键预览** - 右侧工具栏中点击`预览`可随时查看页面效果
- **自适应布局** - 预览器内部通过计算，将编辑时得到的`px`像素，转化为可自适应的`rem`单位，实现不同分辨率端自适应
- **扫码或链接查看/分享** - 在文档库页面，可以通过扫码或访问链接的方式进行查看或分享

## [Demo](http://h5editor.moog.site)

## 快速开始

```shell
# 依赖安装
$ yarn install
# 启动前端工程
$ yarn front-serve
# 启动后端接口服务
$ yarn back-server
```

> [关于后端接口服务启动报错](#expres启动报错)

## 如何部署

```shell
$ yarn build
```

执行上述命令后会在根目录得到`dist`文件夹，其中包含`front`前端代码和`server`后端代码

### 前端部署

直接将打包后得到的`front`目录部署到`nginx`或其它服务器中,并将`/api`和 `/static`露路径代理到接口服务中，
可参照此[nginx.conf](docker/nginx.conf)配置文件

### 后端部署

1. 将打包后的`server`目录上传服务器

2. `$ npm install --production` 安装依赖

3. 启动服务

   - 推荐使用 **[pm2](https://github.com/Unitech/pm2)**

     ```shell
      $ pm2 start ecosystem.config.js
     ```

     > pm2 方式启动配置了监听文件变动重启，后续更新代码会自动重启

   - 直接启动

     ```shell
      $ node index.js
     ```

### Docker

1. 将执行完`build`后的到的`dist`目录上传到服务器中
2. 构建镜像

   ```shell
     # 进入根目录
     $ cd dist
     # 构建镜像
     $ docker build -t h5editor .
   ```

3. 启动容器

   ```shell
     $ docker run -dit --name h5editor -v $PWD:/app -p 5000:80 h5editor
   ```

   > 上述启动容器是在 dist 目录下进行的，即把 dist 目录挂载到容器中，随后文件变动/更新将同步到容器中
   > 。 当然，服务端代码变动也会自动重启

## 关于前端

前端采用`vue3`+`typescript`开发,并使用以下库

- [element-plus](https://github.com/element-plus/element-plus) 整个前端 UI 框架
- [Vant](https://github.com/vant-ui/vant) 构建三方组件库
- [html2canvas](https://github.com/niklasvh/html2canvas) 文稿封面截图
- [jsondiffpatch](https://github.com/benjamine/jsondiffpatch) json 差异对比，h5-editor 通过`jsondiffpatch`进行差异对比，并通过差异进行`patch`和`unpatch`以实现撤销/重做
- [axios](https://github.com/axios/axios) http 请求
- [qrcode](https://github.com/soldair/node-qrcode) 生成二维码
  > 关于撤销/重做的实现逻辑可查看[此文档](docs/diffpatch/README.md)

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

## 关于后端

后端采用 [Express(4.x)](https://expressjs.com/) + `typescript`开发，并使用了如下库

- [nedb-promises](https://github.com/bajankristof/nedb-promises) 以 json 文件本地存储的数据库
- [ejs](https://github.com/mde/ejs) js 模板引擎，用于服务端渲染页面

## 备份&迁移

文档数据存储在文件根目录`data`目录中。备份迁移只需要此文件夹即可。容器挂载目录`/app/data`

## Q&A

### #expres 启动报错

启动后端接口时得到如下错误

`throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))`

遇到此问题，请在`server/src/index.ts`中把设置模板引擎的代码随意换个位置即可，具体原因不详。
根据 express [issue 中的解释](https://github.com/expressjs/express/issues/4930) 是因为未使用`app.set`替代`app.use`设置模板引擎
但是此项目中确实用的是`app.set`却依旧报错。根据尝试只需要随意换个位置即可成功运行.

```diff
1 const compression = require('compression');
app.use(compression());
- app.set('view engine', 'ejs');
require('express-async-errors');
+ app.set('view engine', 'ejs');
app.all('*', function (req: Request, res: Response, next: NextFunction) {
```

## Licenses

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
