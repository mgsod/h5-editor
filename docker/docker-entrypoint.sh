#!/bin/sh
# 拷贝工作目录到app
mkdir -p /app
cp -r ./ /app
cd /app
# 服务端
cd /app/server
# 安装依赖
npm install
# 安装pm2
npm install pm2 -g
# 启动服务端
pm2 start ecosystem.config.js
# 配置nginx
cp -f /app/nginx.conf /etc/nginx/http.d/default.conf
# 启动nginx
nginx
# 防止进程推出关闭容器
tail -f /dev/null
