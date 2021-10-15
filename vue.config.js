const target = process.env.TARGET || "";
const libConfig = require("./src/components/Previewer/webpack.config");
const defaultConfig = {};
const config = target === "lib" ? libConfig : defaultConfig;
module.exports = config;
