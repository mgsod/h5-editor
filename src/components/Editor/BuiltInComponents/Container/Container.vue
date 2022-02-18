<template>
  <div class="h-container" :style="containerStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { formatPositionValues } from "@/util";

export default defineComponent({
  name: ComponentType.Container,
  inheritAttrs: false,
  props: {
    type: String,
    textAlign: String,
    JustifyContent: String,
    AlignItems: String,
    children: {
      type: Array,
    },
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
        lineHeight: props.lineHeight
          ? formatPositionValues(props.lineHeight)
          : 1,
        fontSize: props.fontSize
          ? formatPositionValues(props.fontSize)
          : "inherit",
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
}
</style>
