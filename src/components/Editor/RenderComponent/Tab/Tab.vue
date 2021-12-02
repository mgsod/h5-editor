<template>
  <div class="tab">
    <div
      class="tab-title"
      v-for="item in children"
      :key="`tab_title_${item.id}`"
    >
      {{ item.alias }}
    </div>
    <div class="tab-container">
      <component-wrapper
        v-for="item in children"
        :key="item.id"
        :property="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import ComponentWrapper from "@/components/Editor/RenderComponent/ComponentWrapper/index.vue";
export default defineComponent({
  name: ComponentType.Tab,
  props: {
    children: Array,
  },
  components: { ComponentWrapper },
  setup() {},
});
</script>

<style scoped lang="less">
.tab {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tab-title {
    flex: 0 0 20px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 14px;
    &.active {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 18px;
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
