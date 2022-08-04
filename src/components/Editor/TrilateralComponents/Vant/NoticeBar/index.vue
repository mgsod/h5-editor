<template>
  <van-notice-bar
    :color="color"
    :background="background.color"
    left-icon="volume-o"
    :mode="mode"
    @close="close"
    :scrollable="!vertical"
  >
    <van-swipe
      v-if="vertical"
      vertical
      class="notice-swipe"
      :autoplay="3000"
      :show-indicators="false"
    >
      <van-swipe-item v-for="item in multiple" :key="item"
        >{{ item }}
      </van-swipe-item>
    </van-swipe>
    <template v-else>
      {{ parseExpression(text) }}
    </template>
  </van-notice-bar>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { NoticeBar, Swipe, SwipeItem } from 'vant';
import { ComponentType } from '@/components/Editor/ComponentTypes';
import { IBackground } from '@/components/Editor/BuiltInComponents/Component';
import { NoticeBarMode } from '@/components/Editor/TrilateralComponents/Vant/NoticeBar/index';

export default defineComponent({
  name: ComponentType.NoticeBar,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    background: Object as PropType<IBackground>,
    mode: String as PropType<NoticeBarMode>,
    vertical: Boolean,
    multiple: Array,
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  emits: ['updateProps'],
  setup(props, { emit }) {
    const isPreview = inject('isPreview');
    return {
      close() {
        isPreview && emit('updateProps', { display: 'none' });
      },
    };
  },
});
</script>

<style scoped>
.van-notice-bar {
  height: 100%;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
