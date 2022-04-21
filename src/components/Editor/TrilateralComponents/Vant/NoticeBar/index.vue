<template>
  <van-notice-bar
    :color="color"
    :background="background.color"
    left-icon="volume-o"
    :text="parseExpression(text)"
    :mode="mode"
    @close="close"
  />
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from "vue";
import { NoticeBar } from "vant";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { IBackground } from "@/components/Editor/BuiltInComponents/Component";
import { NoticeBarMode } from "@/components/Editor/TrilateralComponents/Vant/NoticeBar/index";

export default defineComponent({
  name: ComponentType.NoticeBar,
  inheritAttrs: false,
  props: {
    text: String,
    color: String,
    background: Object as PropType<IBackground>,
    mode: String as PropType<NoticeBarMode>,
  },
  components: { [NoticeBar.name]: NoticeBar },
  emits: ["updateProps"],
  setup(props, { emit }) {
    const isPreview = inject("isPreview");
    return {
      close() {
        isPreview && emit("updateProps", { display: "none" });
      },
    };
  },
});
</script>

<style scoped>
.van-notice-bar {
  height: 100%;
}
</style>
