<template>
  <div
    class="h-text"
    :style="{
      fontStyle,
      color,
      fontWeight,
      fontFamily,
      textAlign,
      lineHeight: lineHeight ? `${lineHeight}px` : 1,
      fontSize: fontSize + 'px',
    }"
    :class="['text-overflow', overflow ? `line${maxLines}` : '']"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ComponentType } from "@/components/Editor/RenderComponent/types";

export default defineComponent({
  name: ComponentType.Text,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    fontFamily: String,
    fontSize: Number,
    fontWeight: String,
    fontStyle: String,
    textAlign: String,
    lineHeight: String,
    overflow: Boolean,
    maxLines: Number,
  },
  components: {},
  setup() {},
});
</script>

<style scoped lang="less">
.text-overflow {
  word-break: break-all;
  &.line1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.line2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  &.line3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  &.line4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  &.line5 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}
</style>
