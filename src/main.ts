import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElButton, ElSelect, ElOption } from "element-plus";
import "./assets/css/reset.css";
const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(ElButton)
  .use(ElSelect)
  .use(ElOption)
  .mount("#app");
