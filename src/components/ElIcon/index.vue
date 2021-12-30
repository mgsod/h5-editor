<template>
  <el-icon :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as Icons from "@element-plus/icons-vue";

export default defineComponent({
  name: "icon",
  props: {
    name: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  components: Icons,
  setup() {},
});
</script>

<style scoped lang="less"></style>
