const target = process.env.TARGET || "";
// 构建组件包配置
const libConfig = require("./src/components/Previewer/webpack.config");
// 项目默认配置
const defaultConfig = {};
const config = target === "lib" ? libConfig : defaultConfig;
module.exports = config;
