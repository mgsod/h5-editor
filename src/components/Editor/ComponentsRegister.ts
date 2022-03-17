import { App, defineAsyncComponent } from "vue";
import Previewer from "@/components/Previewer/index.vue";
import "@/assets/css/reset.css";
import HContainer from "@/components/Editor/BuiltInComponents/Container/Container.vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import useDynamicVars from "@/hooks/useDynamicVars";

const { parseExpression } = useDynamicVars();
const HImg = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "HImg" */ "@/components/Editor/BuiltInComponents/Img/Img.vue"
    )
);
const Swiper = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "Swiper" */ "@/components/Editor/TrilateralComponents/Vant/Swiper/Swiper.vue"
    )
);
const NoticeBar = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "NoticeBar" */ "@/components/Editor/TrilateralComponents/Vant/NoticeBar/index.vue"
    )
);
const HButton = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "HButton" */ "@/components/Editor/BuiltInComponents/Button/Button.vue"
    )
);
const HText = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "HText" */ "@/components/Editor/BuiltInComponents/Text/Text.vue"
    )
);
const HTab = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "HTab" */ "@/components/Editor/TrilateralComponents/Vant/Tab/Tab.vue"
    )
);
const NavBar = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "NavBar" */ "@/components/Editor/TrilateralComponents/Vant/NavBar/NavBar.vue"
    )
);

const components = [Previewer, HContainer];
// 异步组件，分包加载
const asyncComponents = [
  { name: ComponentType.Img, asyncComponentWrapper: HImg },
  { name: ComponentType.Swiper, asyncComponentWrapper: Swiper },
  { name: ComponentType.Text, asyncComponentWrapper: HText },
  { name: ComponentType.Tab, asyncComponentWrapper: HTab },
  { name: ComponentType.Button, asyncComponentWrapper: HButton },
  { name: ComponentType.NoticeBar, asyncComponentWrapper: NoticeBar },
  { name: ComponentType.NavBar, asyncComponentWrapper: NavBar },
];
export default {
  install(app: App) {
    components.forEach((item) => {
      app.component(item.name, item);
    });
    asyncComponents.forEach((item) => {
      app.component(item.name, item.asyncComponentWrapper);
    });

    app.mixin({
      methods: {
        parseExpression,
      },
    });
  },
};
