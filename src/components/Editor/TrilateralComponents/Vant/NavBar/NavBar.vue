<template>
  <van-nav-bar
    :title="parseExpression(title)"
    :left-text="showBack ? '返回' : ''"
    :left-arrow="showBack"
    :class="{ showBottomLine }"
    @click-left="back"
    :style="{ color, background: bgColor }"
  />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { NavBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Router } from "@/components/Previewer/router";
import { scaleLinear } from "d3-scale";

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
    /*color: {
      type: String,
      required: true,
    },*/
  },
  components: { [NavBar.name]: NavBar },
  setup() {
    const router = inject("router") as Router;
    const color = ref("#fff");
    const bgColor = ref("rgba(255,255,255,0)");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const scale = scaleLinear().domain([0, 46]).range(["#fff", "#333"]);
    onMounted(() => {
      const root = (
        document.getElementById("root") as HTMLElement
      ).querySelector(".h-container") as HTMLElement;
      root.addEventListener("scroll", (e) => {
        const { scrollTop } = root;
        // 计算导航头部文字渐变颜色
        if (scrollTop <= 46) {
          color.value = scale(scrollTop) as unknown as string;
          bgColor.value = `rgba(255,255,255,${scrollTop / 46})`;
        } else if (scrollTop > 46) {
          color.value = "#333";
          bgColor.value = "#fff";
        }
      });
    });
    return {
      back() {
        router.back();
      },
      router,
      color,
      bgColor,
    };
  },
});
</script>

<style lang="less">
.van-nav-bar {
  background: transparent;

  &:after {
    border-bottom-width: 0;
  }

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-nav-bar__left i {
    color: inherit;
  }

  &.showBottomLine {
    &:after {
      border-bottom-width: 1px;
    }
  }
}
</style>
