<template>
  <van-nav-bar
    :title="parseExpression(title)"
    :left-text="showBack ? '返回' : ''"
    :left-arrow="showBack"
    @click-left="back"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { NavBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Router } from "@/components/Previewer/router";

export default defineComponent({
  inheritAttrs: false,
  name: ComponentType.NavBar,
  props: {
    title: {
      type: String,
      required: true,
    },
    showBack: {
      type: Boolean,
    },
  },
  components: { [NavBar.name]: NavBar },
  setup() {
    const router = inject("router") as Router;
    return {
      back() {
        router.back();
      },
      router,
    };
  },
});
</script>

<style scoped lang="less"></style>
