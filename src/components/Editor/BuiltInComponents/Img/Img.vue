<template>
  <img :src="src" class="" v-if="src" :style="style" />
  <div class="empty-img" v-else>
    <i class="el-icon-picture-outline" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { objectFit } from '@/components/Editor/BuiltInComponents/Img/index';
import { ComponentType } from '@/components/Editor/ComponentTypes';
import { getBorderRadius } from '@/hooks/useStyle';

export default defineComponent({
  name: ComponentType.Img,
  inheritAttrs: false,
  props: {
    src: String,
    objectFit: String as PropType<objectFit>,
    borderRadius: String,
  },
  components: {},
  setup(props) {
    const style = computed(() => {
      return {
        objectFit: props.objectFit,
        ...getBorderRadius(props.borderRadius),
      };
    });
    return {
      style,
      disableDragImg: (e: MouseEvent) => {
        e.preventDefault();
        return false;
      },
    };
  },
});
</script>

<style lang="less">
.component-wrapper[data-type='HImg'] {
  // 解决img标签在div中，底部呈现4px空隙
  font-size: 0;
}

img {
  -webkit-user-drag: none;
  width: 100%;
  height: 100%;
}

.empty-img {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  position: relative;
  top: calc(50% - 10px);
}
</style>
