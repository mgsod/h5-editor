import express, { Response, Request, NextFunction } from 'express';
import compression from 'compression';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import routes from './route';
import preview from './route/preview';
import config from './config';
require('express-async-errors');

const { port, dataPath } = config;
const app = express();

app.use(compression());
app.set('view engine', 'ejs');
app.all('*', function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method === 'OPTIONS') res.send(200);
  /*让options请求快速返回*/ else next();
});

// 预览器静态服务
app.use('/static', express.static(path.join(__dirname, './static')));
// 图片资源静态服务
app.use('/static', express.static(path.join(dataPath, '/static')));

app.use(bodyParser.json({ limit: '50mb' }));
app.set('views', path.join(__dirname, './views'));
app.use('/api', routes);
app.use('/preview', preview);
app.listen(port, () => {
  console.log(`server run at:http://127.0.0.1:${port}`);
});
app.use(function (req: Request, res: Response) {
  res.status(404).send('404 Not Found');
});
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    msg: err.stack || err.message || err,
    code: 500,
  });
});
