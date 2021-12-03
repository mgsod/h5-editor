import { App } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install(app: App) {
    const requireComponent = require.context(
      // 其组件目录的相对路径
      "../RenderComponent",
      // 是否查询其子目录
      true,
      // 匹配基础组件文件名的正则表达式
      /\w+\.(vue)$/
    );
    requireComponent.keys().forEach((fileName: string) => {
      // 获取组件配置
      const componentConfig = requireComponent(fileName);
      // 获取组件的 PascalCase 命名
      const componentName = upperFirst(
        camelCase(
          // 获取和目录深度无关的文件名
          fileName
            .split("/")
            .pop()
            ?.replace(/\.\w+$/, "")
        )
      );
      if (
        !componentName.includes("setting") &&
        !componentName.includes("Wrapper")
      ) {
        app.component(
          `H${componentName}`,
          componentConfig.default || componentConfig
        );
      } else {
        app.component(
          componentName,
          componentConfig.default || componentConfig
        );
      }
    });
  },
};
