<template>
  <div class="h-container" :style="containerStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Container",
  inheritAttrs: false,
  props: {
    type: String,
    textAlign: String,
    JustifyContent: String,
    AlignItems: String,
    children: Array,
    display: String,
    color: String,
    fontFamily: String,
    fontSize: Number,
    fontWeight: String,
    fontStyle: String,
    lineHeight: String,
  },
  setup(props) {
    const containerStyle = computed(() => {
      return {
        display: props.display,
        textAlign: props.textAlign,
        JustifyContent: props.JustifyContent,
        AlignItems: props.AlignItems,
        fontStyle: props.fontStyle,
        color: props.color,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        lineHeight: props.lineHeight ? `${props.lineHeight}px` : 1,
        fontSize: props.fontSize ? `${props.fontSize}px` : "inherit",
      };
    });
    return {
      containerStyle,
    };
  },
});
</script>

<style lang="less">
.h-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
