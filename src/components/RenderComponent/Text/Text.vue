<template>
  <div
    :style="{
      fontStyle,
      color,
      fontWeight,
      fontFamily,
      fontSize: fontSie + 'px',
      textAlign,
    }"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { ComponentType } from "@/components/RenderComponent/types";

export default defineComponent({
  name: ComponentType.Text,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    fontFamily: String,
    fontSie: Number,
    fontWeight: String,
    fontStyle: String,
    textAlign: String,
  },
  components: {},
  setup() {},
});
</script>

<style scoped lang="less"></style>
