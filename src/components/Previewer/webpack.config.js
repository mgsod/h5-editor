const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  outputDir: 'server/src/static/previewer',
  productionSourceMap: false,
  configureWebpack: {
    output: {
      // 默认导出
      libraryExport: 'default',
      // 包名
      library: 'previewer',
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(__dirname, './package.json'),
          to: '',
        },
      ]),
    ],
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i,
          }),
        ],
      },
    },
  },
};
