<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="back" />
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { NavBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";

export default defineComponent({
  inheritAttrs: false,
  name: ComponentType.NavBar,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: { [NavBar.name]: NavBar },
  setup() {
    const router = inject("router");
    return {
      back() {
        console.log(router);
      },
    };
  },
});
</script>

<style scoped lang="less"></style>
