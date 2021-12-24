const target = process.env.TARGET || "";
// 构建组件包配置
const libConfig = require("./src/components/Previewer/webpack.config");
// 项目默认配置
const defaultConfig = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
};
const config = target === "lib" ? libConfig : defaultConfig;
module.exports = config;
