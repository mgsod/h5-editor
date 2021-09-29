import { App } from "vue";
import register from "@/components/Editor/RenderComponent/register";
import Previewer from "@/components/Previewer/index.vue";
export default {
  install(app: App) {
    register.install(app);
    app.component("Previewer", Previewer);
  },
};
