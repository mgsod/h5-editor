<template>
  <div class="tab">
    <div class="tab-title hidden-scrollbar">
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
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  defineAsyncComponent,
} from "vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";

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
  components: {
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
  setup(props) {
    const privateActive = ref(props.active);
    const tabTitleRefs = ref([]);
    const transform = ref("");
    const getTransform = async () => {
      await nextTick();
      const $ref = tabTitleRefs.value[privateActive.value] as HTMLElement;
      const { offsetLeft, offsetWidth } = $ref;
      transform.value = `translateX(${
        offsetLeft + offsetWidth / 2
      }px) translateX(-50%)`;
    };
    watch(privateActive, getTransform);
    const tabsLength = computed(() => {
      return props.children.length;
    });
    watch(tabsLength, () => {
      privateActive.value =
        privateActive.value > tabsLength.value - 1
          ? tabsLength.value - 1
          : privateActive.value;
    });

    onMounted(() => {
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
