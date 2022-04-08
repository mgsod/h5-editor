<template>
  <van-nav-bar
    ref="navbar"
    :title="parseExpression(title)"
    :left-text="showBack ? '返回' : ''"
    :left-arrow="showBack"
    :class="{ showBottomLine }"
    @click-left="back"
    :style="{ color: privateColor, background: bgColor }"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  ref,
  toRefs,
  watch,
  PropType,
} from "vue";
import { NavBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Router } from "@/components/Previewer/router";
import { scaleLinear } from "d3-scale";
import { IBackground } from "@/components/Editor/BuiltInComponents/Component";

export default defineComponent({
  inheritAttrs: false,
  name: ComponentType.NavBar,
  props: {
    title: {
      type: String,
      required: true,
    },
    showBack: {
      type: Boolean,
    },
    showBottomLine: {
      type: Boolean,
    },
    color: {
      type: String,
      required: true,
    },
    fullScreen: {
      type: Boolean,
      required: true,
    },
    background: {
      type: Object as PropType<IBackground>,
      required: true,
    },
  },
  components: { [NavBar.name]: NavBar },
  setup(props) {
    const headerHeight = 46;
    const { fullScreen, color, background } = toRefs(props);
    const router = inject("router") as Router;

    const privateColor = ref(color.value);
    const bgColor = ref(background.value.color);
    const navbar = ref();
    const setHeaderMargin = () => {
      const rootContainer = navbar.value.$el.parentElement
        .parentElement as HTMLElement;

      if (rootContainer) {
        if (!fullScreen.value) {
          rootContainer.style.paddingTop = `${headerHeight}px`;
        } else {
          rootContainer.style.paddingTop = "0";
        }
      }
    };
    watch(fullScreen, setHeaderMargin);
    onMounted(() => {
      const root = navbar.value.$el.closest(".h-container") as HTMLElement;
      setHeaderMargin();
      if (fullScreen.value) {
        const scale = scaleLinear()
          .domain([0, headerHeight])
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .range(["#fff", "#333"]);
        root.addEventListener("scroll", () => {
          const { scrollTop } = root;
          // 计算导航头部文字渐变颜色
          if (scrollTop <= headerHeight) {
            privateColor.value = scale(scrollTop) as unknown as string;
            bgColor.value = `rgba(255,255,255,${scrollTop / headerHeight})`;
          } else if (scrollTop > headerHeight) {
            privateColor.value = "#333";
            bgColor.value = "#fff";
          }
        });
      }
    });
    return {
      back() {
        router.back();
      },
      router,
      privateColor,
      bgColor,
      navbar,
    };
  },
});
</script>

<style lang="less">
.van-nav-bar {
  background-color: transparent;

  &:after {
    border-bottom-width: 0 !important;
  }

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-nav-bar__left i {
    color: inherit;
  }

  &.showBottomLine {
    &:after {
      border-bottom-width: 1px !important;
    }
  }
}
</style>
