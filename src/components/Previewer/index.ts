import { App } from "vue";
import Previewer from "@/components/Previewer/index.vue";
export default {
  install(app: App) {
    app.component("Previewer", Previewer);
  },
};
