import { App } from "vue";
import Previewer from "@/components/Previewer/index.vue";
import "@/assets/css/reset.css";
import HImg from "@/components/Editor/BuiltInComponents/Img/Img.vue";
import HContainer from "@/components/Editor/BuiltInComponents/Container/Container.vue";
import HText from "@/components/Editor/BuiltInComponents/Text/Text.vue";
import HTab from "@/components/Editor/BuiltInComponents/Tab/Tab.vue";
import HButton from "@/components/Editor/BuiltInComponents/Button/Button.vue";
import NoticeBar from "@/components/Editor/TrilateralComponents/Vant/NoticeBar/index.vue";

const components = [HImg, HContainer, HText, HTab, HButton, NoticeBar];
export default {
  install(app: App) {
    components.forEach((item) => {
      app.component(item.name, item);
    });
    app.component("Previewer", Previewer);
  },
};
