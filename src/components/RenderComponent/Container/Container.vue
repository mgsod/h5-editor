<template>
  <div class="h-container" :style="containerStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Container",
  props: {
    type: String,
    textAlign: String,
    JustifyContent: String,
    AlignItems: String,
    children: Array,
  },
  setup(props) {
    const containerStyle = computed(() => {
      return {
        display: "flex",
        textAlign: props.textAlign,
        JustifyContent: props.JustifyContent,
        AlignItems: props.AlignItems,
      };
    });
    return {
      containerStyle,
    };
  },
});
</script>

<style scoped lang="less">
.h-container {
  width: 100%;
  height: 100%;
}
</style>
