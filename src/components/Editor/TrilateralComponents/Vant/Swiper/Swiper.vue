<template>
  <div class="swiper">
    <template v-if="isPreview">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="item in children" :key="item.id">
          <component-wrapper :property="item" />
        </van-swipe-item>
      </van-swipe>
    </template>
    <template v-else>
      <div class="swiper-head">轮播</div>
      <component-wrapper
        v-for="(item, index) in children"
        :key="item.id"
        :property="item"
        v-show="active === index"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject } from "vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Swipe, SwipeItem } from "vant";

export default defineComponent({
  name: ComponentType.Swiper,
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
  inheritAttrs: false,
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
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
    const isPreview = inject("isPreview");
    return {
      isPreview,
    };
  },
});
</script>

<style lang="less">
.swiper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  & > .component-wrapper {
    height: calc(100% - 20px) !important;
    width: 100% !important;
  }
  .van-swipe {
    height: 100%;
    width: 100%;
  }
  .swiper-head {
    height: 20px;
    background: #ccc;
    text-align: center;
    line-height: 20px;
  }
}
</style>
