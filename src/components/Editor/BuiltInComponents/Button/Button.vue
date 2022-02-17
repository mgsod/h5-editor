<template>
  <div class="h-button">
    <h-text v-bind="{ ...$attrs }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ComponentType } from "@/components/Editor/BuiltInComponents/types";

export default defineComponent({
  name: ComponentType.Button,
  inheritAttrs: false,
  setup() {},
});
</script>

<style lang="less">
.h-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
