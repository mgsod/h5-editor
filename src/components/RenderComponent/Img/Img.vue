<template>
  <img :src="src" class="" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { objectFit } from "@/components/RenderComponent/Img/index";

export default defineComponent({
  name: "Img",
  props: {
    src: String,
    objectFit: String as PropType<objectFit>,
  },
  components: {},
  setup() {
    return {
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
</style>
