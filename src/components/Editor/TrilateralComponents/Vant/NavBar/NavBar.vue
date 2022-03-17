<template>
  <van-nav-bar
    :title="parseExpression(title)"
    :left-text="showBack ? '返回' : ''"
    :left-arrow="showBack"
    :class="{ showBottomLine }"
    @click-left="back"
    :style="{ color }"
  />
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { NavBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Router } from "@/components/Previewer/router";

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
    onMounted(() => {
      const root = (
        document.getElementById("root") as HTMLElement
      ).querySelector(".h-container") as HTMLElement;
      root.addEventListener("scroll", (e) => {
        const { scrollTop } = root;
        // 计算导航头部文字渐变颜色
        if (scrollTop <= 0) {
          color.value = "#fff";
        } else if (scrollTop <= 46) {
          const rate = scrollTop / 46;
          const grayWhite = rate * 255;
          color.value = `rgb(${grayWhite}, ${grayWhite}, ${grayWhite})`;
        } else {
          color.value = "#333";
        }

        /*
                // 计算导航头部渐变背景色。多计算几像素是因为原背景切图在375px宽度时，下方有大约5像素的白边
                if (diff < headerHeight + 8) {
                  const rate = diff / (headerHeight + 8);
                  headerBgc = `rgba(255, 86, 73, ${rate})`;
                  headerBgi = "none";
                }*/
        console.log(color.value);
      });
    });
    return {
      back() {
        router.back();
      },
      router,
      color,
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
