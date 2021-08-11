import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import elementUI from "./plugins/ElementUI";
import "element-plus/lib/theme-chalk/el-var.css";
import "@/assets/css/index.less";

const app = createApp(App);
elementUI(app);
app.use(store, key);
app.use(router).mount("#app");
