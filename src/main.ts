import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import elementUI from "./plugins/ElementUI";
import "element-plus/dist/index.css";
import "@/assets/css/index.less";
import register from "@/components/Editor/ComponentsRegister";
import ElIcon from "@/components/ElIcon/index.vue";
import "default-passive-events";
import useDynamicVars from "@/hooks/useDynamicVars";

const app = createApp(App);
const { parseExpression } = useDynamicVars();
elementUI(app);
app.use(store, key);
app.use(register);
app.component("el-icons", ElIcon);
app.use(router).mount("#app");
app.mixin({
  methods: {
    parseExpression,
  },
});
