<template>
  <img :src="src" class="" v-if="src" :style="style" />
  <div class="empty-img" v-else>
    <i class="el-icon-picture-outline" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { objectFit } from "@/components/RenderComponent/Img/index";
import { ComponentType } from "@/components/RenderComponent/types";

export default defineComponent({
  name: ComponentType.Img,
  props: {
    src: String,
    objectFit: String as PropType<objectFit>,
  },
  components: {},
  setup(props) {
    const style = computed(() => {
      return {
        objectFit: props.objectFit,
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

<style scoped lang="less">
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
