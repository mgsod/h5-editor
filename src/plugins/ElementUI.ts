import { App } from "vue";
import {
  ElButton,
  ElSelect,
  ElOption,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElTree,
  ElForm,
  ElFormItem,
  ElInput,
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
    .use(ElTree)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)

    .use(ElIcon);
};
