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
import { defineComponent, onBeforeUnmount, provide } from 'vue';
import Render from './render.vue';
import { IRoute, Router } from '@/components/Previewer/router';
import cloneDeep from 'lodash/cloneDeep';

export default defineComponent({
  name: 'previewer',
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
    modelValue: String,
    homePageId: {
      type: String,
    },
    datasource: {
      type: Object,
    },
  },
  emits: ['update:homePageId'],
  components: { Render },
  setup(props, { emit }) {
    const router = new Router({
      routes: cloneDeep(props.pages) as IRoute[],
      homePage: props.homePageId,
      mode: 'hash',
      onChange($router) {
        emit('update:homePageId', $router.current?.id);
      },
    });
    provide('isPreview', true);
    provide('router', router);
    console.log(222, props.datasource);
    provide('datasource', props.datasource);
    onBeforeUnmount(() => {
      console.log('销毁');
      router.destroy();
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
  .component-wrapper {
    &#root {
      overflow: hidden;
    }
  }

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
