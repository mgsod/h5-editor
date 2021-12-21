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
  ElColorPicker,
  ElSwitch,
  ElInputNumber,
  ElTable,
  ElTableColumn,
  ElLink,
  ElDialog,
  ElPopconfirm,
  ElPopover,
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
    .use(ElIcon)
    .use(ElSwitch)
    .use(ElInputNumber)
    .use(ElColorPicker)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElDialog)
    .use(ElPopconfirm)
    .use(ElPopover)
    .use(ElLink);
};
