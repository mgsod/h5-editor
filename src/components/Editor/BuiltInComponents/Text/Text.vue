<template>
  <span
    class="h-text"
    :style="{
      fontStyle,
      color,
      fontWeight,
      fontFamily,
      textAlign,
      lineHeight: lineHeight ? `${lineHeight}px` : '',
      fontSize: fontSize ? `${fontSize}px` : '',
    }"
    :class="[overflow ? `line${maxLines}` : '']"
  >
    {{ parseExpression(text) }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ComponentType } from '@/components/Editor/ComponentTypes';

export default defineComponent({
  name: ComponentType.Text,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    fontFamily: String,
    fontSize: [Number, String],
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

<style lang="less">
.component-wrapper[data-type='HText'] {
  display: inline-block;
  vertical-align: text-top;
}

.h-text {
  display: block;
  word-break: break-all;

  &.line1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
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
