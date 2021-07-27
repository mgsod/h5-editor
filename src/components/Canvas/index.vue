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
import { defineComponent, toRaw, toRefs, Ref, ref, reactive } from "vue";
import { useStore, mapState } from "vuex";
import useDragEffect from "@/hooks/useDrag";
import ComponentWrapper from "@/components/ComponentWrapper/index.vue";

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
    console.log("store", store.state);

    const components = store.state.pages[0].components;

    return {
      dragenter,
      dragleave,
      drop,
      dragover,
      store,
      components,
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
    height: 80vh;
    position: relative;
    top: calc(50% - 40vh);
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.02) 1px, transparent 0),
      linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 0),
      linear-gradient(-90deg, rgba(0, 0, 0, 0.03) 1px, transparent 0),
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 0),
      linear-gradient(transparent 4px, #ffffff 0, #ffffff 97px, transparent 0),
      linear-gradient(-90deg, #ffffff 1px, transparent 0),
      linear-gradient(
        -90deg,
        transparent 4px,
        #ffffff 0,
        #ffffff 97px,
        transparent 0
      ),
      linear-gradient(#e5e5e5 1px, transparent 0), #f5f5f5;
    background-size: 10px 10px, 10px 10px, 100px 100px, 100px 100px, 100px 100px,
      100px 100px, 100px 100px, 100px 100px;
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
