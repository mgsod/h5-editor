import { App } from "vue";
import Previewer from "@/components/Previewer/index.vue";

import HImg from "@/components/Editor/RenderComponent/Img/Img.vue";
import HContainer from "@/components/Editor/RenderComponent/Container/Container.vue";
import HText from "@/components/Editor/RenderComponent/Text/Text.vue";
import HTab from "@/components/Editor/RenderComponent/Tab/Tab.vue";

const components = [HImg, HContainer, HText, HTab];
export default {
  install(app: App) {
    components.forEach((item) => {
      app.component(item.name, item);
    });
    app.component("Previewer", Previewer);
  },
};
