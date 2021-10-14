const target = process.env.TARGET || "";
module.exports = {
  outputDir: target === "lib" ? "previewer" : "dist",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
};
