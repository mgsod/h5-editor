const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  outputDir: "previewer",
  configureWebpack: {
    output: {
      // 默认导出
      libraryExport: "default",
      // 包名
      library: "previewer",
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(
            __dirname,
            "src/components/Previewer/package.json"
          ),
          to: path.resolve(__dirname, "previewer/"),
        },
      ]),
    ],
  },
};
