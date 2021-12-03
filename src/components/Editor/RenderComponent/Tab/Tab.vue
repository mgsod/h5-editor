<template>
  <div class="tab">
    <div class="tab-title">
      <div class="tab-title-list">
        <div
          class="tab-title-list-item"
          v-for="(item, index) in children"
          :class="[{ active: privateActive === index }]"
          :key="`tab_title_${item.id}`"
          :ref="(el) => (tabTitleRefs[index] = el)"
          @click="change(index)"
        >
          {{ item.alias }}
        </div>
      </div>
      <div class="tab-title-line" :style="{ transform: transform }"></div>
    </div>
    <div class="tab-container">
      <component-wrapper
        v-for="(item, index) in children"
        :key="item.id"
        :property="item"
        v-show="privateActive === index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import ComponentWrapper from "@/components/Editor/RenderComponent/ComponentWrapper/index.vue";
export default defineComponent({
  inheritAttrs: false,
  name: ComponentType.Tab,
  props: {
    children: Array,
    active: {
      type: Number,
      required: true,
    },
  },
  components: { ComponentWrapper },
  setup(props) {
    const privateActive = ref(props.active);
    const tabTitleRefs = ref([]);
    const transform = ref("");
    const getTransform = () => {
      const $ref = tabTitleRefs.value[privateActive.value] as HTMLElement;
      const { offsetLeft, offsetWidth } = $ref;
      transform.value = `translateX(${
        offsetLeft + offsetWidth / 2
      }px) translateX(-50%)`;
    };
    watch(privateActive, getTransform);

    onMounted(async () => {
      await nextTick();
      getTransform();
    });
    return {
      transform,
      privateActive,
      tabTitleRefs,
      change(index: number) {
        privateActive.value = index;
      },
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
    flex: 0 0 30px;
    position: relative;
    overflow: scroll;
    &-list {
      height: 18px;
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
        &.active {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 18px;
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
