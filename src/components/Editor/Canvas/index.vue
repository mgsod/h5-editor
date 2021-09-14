<template>
  <div class="canvas-wrapper">
    <div class="wrapper-grid">
      <div class="canvas" id="canvas">
        <component-wrapper
          v-for="item in components"
          :key="item.id"
          :property="item"
        />
        <div
          class="border"
          :style="borderStyle"
          :class="{ lowZIndex, isDragNew }"
          v-show="selectedComponentId"
          @mousedown="mouseDown($event)"
        >
          <div
            class="point"
            :class="item"
            v-for="item in resizePoint"
            :key="item"
            @mousedown="mouseDown($event, item)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import useDragEffect from "@/hooks/useDrag";
import ComponentWrapper from "@/components/Editor/RenderComponent/ComponentWrapper/index.vue";
import useVirtualBorder from "@/hooks/useVirtualBorder";
import useResize from "@/hooks/useResize";

export default defineComponent({
  name: "H5canvas",
  components: { ComponentWrapper },
  setup() {
    const { dragenter, dragleave, drop, dragover } = useDragEffect();
    const store = useStore();
    const { borderStyle, borderTransition } = useVirtualBorder();
    // 拖拽/更改组件大小位置
    const { mouseDown, resizePoint } = useResize();
    const isDragNew = computed(() => {
      return store.state.editor.isDrag;
    });
    const lowZIndex = computed(() => {
      const isRoot = store.state.editor.selectedComponents?.id === "root";
      return isDragNew.value || isRoot;
    });
    return {
      dragenter,
      dragleave,
      drop,
      dragover,
      store,
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
      borderStyle,
      borderTransition,
      mouseDown,
      resizePoint,
      lowZIndex,
      isDragNew,
      selectedComponentId: computed(() => {
        return store.state.editor.selectedComponents?.id;
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
    height: 600px;
    position: relative;
    top: calc(50% - 300px);
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
      position: relative;
      overflow-y: auto;
      &.enterContainer,
      :deep(div.enterContainer) {
        outline: 1px dashed var(--el-color-warning) !important;
      }
      .border {
        position: fixed;
        outline: 1px solid var(--el-color-primary);
        .point {
          position: absolute;
          background: #fff;
          border: 1px solid #59c7f9;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          &.lt {
            margin-left: -3px;
            margin-top: -3px;
            left: 0;
            top: 0;
            cursor: nw-resize;
          }
          &.rt {
            margin-right: -3px;
            margin-top: -3px;
            right: 0;
            top: 0;
            cursor: ne-resize;
          }
          &.rb {
            margin-right: -3px;
            margin-bottom: -3px;
            right: 0;
            bottom: 0;
            cursor: se-resize;
          }
          &.lb {
            margin-left: -3px;
            margin-bottom: -3px;
            left: 0;
            bottom: 0;
            cursor: sw-resize;
          }
          &.l {
            margin-left: -4px;
            left: 0;
            top: calc(50% - 3px);
            cursor: ew-resize;
          }
          &.r {
            margin-right: -4px;
            right: 0;
            top: calc(50% - 3px);
            cursor: ew-resize;
          }
          &.t {
            margin-top: -4px;
            left: calc(50% - 3px);
            top: 0;
            cursor: ns-resize;
          }
          &.b {
            margin-bottom: -4px;
            left: calc(50% - 3px);
            bottom: 0;
            cursor: ns-resize;
          }
        }
        z-index: 2;
        &.lowZIndex {
          z-index: 1;
        }
      }
    }
  }
}
</style>
