<template>
  <div class="dom-render">
    {{ homePageId }}
    {{ components }}
    <render
      :rem="rem"
      v-for="item in components"
      :key="item.id"
      :property="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Render from "./render.vue";
import { IRoute, Router } from "@/components/Previewer/router";
import { cloneDeep } from "lodash";
export default defineComponent({
  name: "previewer",
  inheritAttrs: false,
  props: {
    rem: {
      type: Boolean,
      default: true,
    },
    pages: {
      type: Array,
      default: () => [],
    },
    homePageId: {
      type: String,
    },
  },
  components: { Render },
  setup(props) {
    const router = new Router({
      routes: cloneDeep(props.pages) as IRoute[],
      homePage: "",
    });
    return {
      components: router.renderComponents,
      setPath(flag: string) {
        router.setPath(flag);
      },
    };
  },
});
</script>

<style lang="less">
.dom-render {
  // 下层div盒模型全部设置为border-box;
  div {
    box-sizing: border-box;
    border-width: 0;
  }
  height: 100%;
  & > div {
    min-height: 100%;
  }
}
</style>
