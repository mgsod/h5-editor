<template>
  <van-notice-bar
    :color="color"
    :background="background.color"
    left-icon="volume-o"
    :text="text"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NoticeBar } from "vant";
import { ComponentType } from "@/components/Editor/BuiltInComponents/types";
import { IBackground } from "@/components/Editor/BuiltInComponents/Component";

export default defineComponent({
  name: ComponentType.NoticeBar,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    background: Object as PropType<IBackground>,
  },
  components: { [NoticeBar.name]: NoticeBar },
  setup() {},
});
</script>

<style scoped>
.van-notice-bar {
  height: 100%;
}
</style>
