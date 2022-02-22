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
import { defineComponent, ref, defineAsyncComponent, watch } from "vue";
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
  setup(props, { emit, attrs }) {
    const privateActive = ref(props.active);
    watch(privateActive, () => {
      emit("updateProps", { active: privateActive.value });
    });
    return {
      privateActive,
    };
  },
});
</script>

<style scoped lang="less">
.tab {
  height: 100%;
  display: flex;
  flex-direction: column;

  .tab-title {
    flex: 0 0 32px;
    position: relative;
    overflow: scroll;

    &-list {
      height: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      &-item {
        flex: 0 0 auto;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
        margin-right: 28px;
        cursor: default;
        padding: 5px 10px;

        &.active {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 20px;
        }
      }
    }

    &-line {
      width: 20px;
      height: 2px;
      background: #333333;
      border-radius: 1px;
      transition: all 0.3s;
    }
  }

  .tab-container {
    flex: auto;
    margin-top: 10px;

    & > .component-wrapper {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
