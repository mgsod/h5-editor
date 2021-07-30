import { App } from "vue";
import {
  ElButton,
  ElSelect,
  ElOption,
  ElTabs,
  ElTabPane,
  ElIcon,
} from "element-plus";

export default (app: App) => {
  app.config.globalProperties.$ELEMENT = {
    size: "small",
  };
  app
    .use(ElButton)
    .use(ElSelect)
    .use(ElOption)
    .use(ElTabs)
    .use(ElTabPane)
    .use(ElIcon);
};
