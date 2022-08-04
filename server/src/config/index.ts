module.exports = {
  port: process.env.NODE_ENV === 'development' ? 3000 : 5555,
  serverName:
    process.env.NODE_ENV === 'development'
      ? ''
      : '生产环境后端服务器配置：（http://h5editorserver.xxxx.com）',
};
