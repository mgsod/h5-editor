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
import { defineComponent, reactive, computed, onBeforeMount } from "vue";
import { useStore, mapGetters } from "vuex";
import useDragEffect from "@/hooks/useDrag";
import ComponentWrapper from "@/components/RenderComponent/ComponentWrapper/index.vue";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";

export default defineComponent({
  name: "H5canvas",
  props: {
    a: Number,
  },
  components: { ComponentWrapper },
  setup(props, ctx) {
    const { dragenter, dragleave, drop, dragover } = useDragEffect();
    const component = reactive({
      width: 10,
      height: 10,
    });
    const store = useStore();
    const a = store.state.editor;
    console.log(a.pageActive);
    return {
      dragenter,
      dragleave,
      drop,
      dragover,
      store,
      components: [],
      x: () => {
        component.width += 1;
      },
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
    height: 90vh;
    position: relative;
    top: calc(50% - 45vh);
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
