<template>
  <div class="dom-render">
    <render
      :rem="rem"
      v-for="item in components"
      :key="item.id"
      :property="item"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Render from "./render.vue";
import { Router } from "@/components/Previewer/router";
import { IPage } from "@/store/Editor";
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
  },
  components: { Render },
  setup(props) {
    const router = new Router(cloneDeep(props.pages) as IPage[], "hpath");
    const components = router.getRouteComponents();
    return {
      components,
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
