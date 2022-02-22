<template>
  <van-tabs
    color="#333333"
    line-width="20.5"
    line-height="2"
    v-model:active="privateActive"
  >
    <van-tab
      :title="item.alias"
      v-for="(item, index) in children"
      :key="item.id"
      :name="index"
    >
      <component-wrapper :property="item" />
    </van-tab>
  </van-tabs>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Tab, Tabs } from "vant";

export default defineComponent({
  inheritAttrs: false,
  name: ComponentType.Tab,
  props: {
    children: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  emits: ["updateProps"],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    componentWrapper: defineAsyncComponent((): any => {
      // 作为库（预览器）打包时，应该用Previewer/render.vue来替代ComponentWrapper组件。因为预览不需要带拖拽选中组件等功能
      // ComponentWrapper作为编辑时使用的组建，不需要打包
      return process.env.VUE_APP_LIB !== "lib"
        ? import(
            "@/components/Editor/BuiltInComponents/ComponentWrapper/index.vue"
          )
        : import("@/components/Previewer/render.vue");
    }),
  },
  setup(props, { emit }) {
    const privateActive = computed({
      get() {
        return props.active;
      },
      set() {
        emit("updateProps", { active: privateActive.value });
      },
    });
    return {
      privateActive,
    };
  },
});
</script>

<style lang="less">
.van-tabs {
  height: 100%;
  .van-tabs__content {
    height: calc(100% - var(--van-tabs-line-height));
    .van-tab__panel {
      height: 100%;
      & > .component-wrapper {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
