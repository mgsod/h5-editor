<template>
  <div class="canvas-wrapper">
    <div class="wrapper-grid">
      <div
        class="canvas"
        @drop="drop"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover="dragover"
      >
        <component-wrapper
          v-for="item in components"
          :key="item.id"
          :property="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import useDragEffect from "@/hooks/useDrag";
import ComponentWrapper from "@/components/RenderComponent/ComponentWrapper/index.vue";

export default defineComponent({
  name: "H5canvas",
  components: { ComponentWrapper },
  setup() {
    const { dragenter, dragleave, drop, dragover } = useDragEffect();
    const store = useStore();
    return {
      dragenter,
      dragleave,
      drop,
      dragover,
      store,
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
    };
  },
});
</script>

<style scoped lang="less">
.canvas-wrapper {
  display: flex;
  justify-content: center;
  .wrapper-grid {
    width: 375px;
    height: 90%;
    position: relative;
    top: calc(50% - 45%);
    background-color: white;
    background-image: linear-gradient(
        90deg,
        rgba(50, 0, 0, 0.05) 3%,
        rgba(0, 0, 0, 0) 3%
      ),
      linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
    background-size: 20px 20px;
    background-repeat: repeat;
    .canvas {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      &.enterContainer,
      /deep/div.enterContainer {
        box-shadow: 0 0 0 2px #1593ff !important;
      }
    }
  }
}
</style>
