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
          class="border-line"
          v-for="item in borderLine"
          :key="`border-${item}`"
          :style="getBorderStyle(item)"
        ></div>
        <!--        <div
                  class="enter-container-border-line"
                  v-for="item in enterContainerBorderLine"
                  :key="`border-${item}`"
                  :style="getBorderStyle(item, true)"
                ></div>-->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-for="item in enterContainerBorderLine"
          :key="`border-${item}`"
          :style="getBorderStyle(item, true)"
          preserveAspectRatio="none"
          :class="item"
        >
          <line
            fill="none"
            x1="0"
            :x2="parseFloat(getBorderStyle(item, true).width || '0')"
            y1="0"
            :y2="parseFloat(getBorderStyle(item, true).height || '0')"
          ></line>
        </svg>
        <div
          class="point"
          :class="item"
          v-for="item in resizePoint"
          :key="item"
          :style="getPointStyle(item)"
          @mousedown="mouseDown($event, item)"
        ></div>
      </div>
    </div>
    <contextmenu
      v-model="showContextmenu"
      :position="position"
      :component="contextmenuComponent"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, provide } from "vue";
import { useStore } from "@/store";
import useDragEffect from "@/hooks/useDrag";
import ComponentWrapper from "@/components/Editor/RenderComponent/ComponentWrapper/index.vue";
import useVirtualBorder from "@/hooks/useVirtualBorder";
import useResize from "@/hooks/useResize";
import useContextmenu from "@/hooks/useContextmenu";
import contextmenu from "@/components/Editor/Contextmenu/index.vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";

type IDirection = "top" | "right" | "bottom" | "left";
export default defineComponent({
  name: "H5canvas",
  components: { ComponentWrapper, contextmenu },
  setup() {
    const { preventDefault, position, showContextmenu, closeContextmenu } =
      useContextmenu();
    const { dragenter, dragleave, drop, dragover } = useDragEffect();
    const store = useStore();
    const { borderStyle, enterContainerBorderStyle } = useVirtualBorder();
    // 拖拽/更改组件大小位置
    const { mouseDown, resizePoint } = useResize();

    // 为避免递归组件中事件一层一层上传（不是原生事件冒泡，而是要获取到最里面一层的组件，需要一层层往外传，这样每一层都会触发一次事件，过于浪费）
    // 在这个组件中提供一个 mouseDownEventHandler 鼠标按下的事件给所有自组件
    // 自组件只需要inject此事件即可从事件触发时的组件直接到这一级
    provide("mouseDownEventHandler", (e: MouseEvent, component: TComponent) => {
      e.preventDefault();
      e.stopPropagation();
      mouseDown(e, component);
    });

    // 同上
    provide("contextmenuHandler", (e: MouseEvent, item: TComponent) => {
      preventDefault(e);
      contextmenuComponent.value = item;
    });

    // 同上
    provide("componentSelectHandler", (e: MouseEvent, item: TComponent) => {
      e.preventDefault();
      e.stopPropagation();
      closeContextmenu();
      store.commit(MUTATION_TYPE.SELECT_COMPONENT, item);
    });
    const isDragNew = computed(() => {
      return store.state.editor.isDrag;
    });
    const borderLine: IDirection[] = ["top", "right", "bottom", "left"];
    const enterContainerBorderLine: IDirection[] = [
      "top",
      "right",
      "bottom",
      "left",
    ];
    const contextmenuComponent = ref();
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
      resizePoint,
      isDragNew,
      borderLine,
      preventDefault,
      position,
      showContextmenu,
      closeContextmenu,
      enterContainerBorderLine,
      selectedComponentId: computed(() => {
        return store.state.editor.selectedComponents?.id;
      }),
      getBorderStyle(flag: IDirection, isDrag = false) {
        const border = isDrag ? enterContainerBorderStyle : borderStyle;
        switch (flag) {
          case "top":
            return {
              width: border.value.width,
              left: border.value.left,
              top: border.value.top,
              display: border.value.display,
            };
          case "bottom":
            return {
              width: border.value.width,
              left: border.value.left,
              top: `${
                parseFloat(border.value.top as string) +
                parseFloat(border.value.height as string)
              }px`,
              display: border.value.display,
            };
          case "left":
            return {
              height: border.value.height,
              left: border.value.left,
              top: border.value.top,
              display: border.value.display,
            };
          case "right":
            return {
              height: border.value.height,
              left: `${
                parseFloat(border.value.left as string) +
                parseFloat(border.value.width as string)
              }px`,
              top: border.value.top,
              display: border.value.display,
            };
        }
      },
      getPointStyle(flag: string) {
        let {
          left = "",
          top = "",
          height = "",
          width = "",
        } = borderStyle.value;
        left = parseFloat(left) - 1.5 + "px";
        top = parseFloat(top) - 1.5 + "px";
        width = parseFloat(width) - 1.5 + "px";
        height = parseFloat(height) - 1.5 + "px";
        const maxWidth = `${parseFloat(left) + parseFloat(width)}px`;
        const halfWidth = `${parseFloat(left) + parseFloat(width) / 2}px`;
        const maxHeight = `${parseFloat(top) + parseFloat(height)}px`;
        const halfHeight = `${parseFloat(top) + parseFloat(height) / 2}px`;
        switch (flag) {
          case "lt":
            return {
              left: left,
              top,
            };
          case "rt":
            return {
              left: maxWidth,
              top,
            };
          case "rb":
            return {
              left: maxWidth,
              top: maxHeight,
            };
          case "lb":
            return {
              left,
              top: maxHeight,
            };
          case "l":
            return {
              left,
              top: halfHeight,
            };
          case "r":
            return {
              left: maxWidth,
              top: halfHeight,
            };
          case "t":
            return {
              left: halfWidth,
              top,
            };
          case "b":
            return {
              left: halfWidth,
              top: maxHeight,
            };
        }
      },
      contextmenuComponent,
      mouseDown,
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

      .border-line {
        position: fixed;
        border-left: 1px solid var(--el-color-primary);
        border-top: 1px solid var(--el-color-primary);
        z-index: 2;
      }

      .enter-container-border-line {
        position: fixed;
        border-left: 1px dashed var(--el-color-warning);
        border-top: 1px dashed var(--el-color-warning);
        z-index: 2;
      }

      .point {
        position: fixed;
        background: #fff;
        border: 1px solid #59c7f9;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        z-index: 2;

        &.lt {
          cursor: nw-resize;
        }

        &.rt {
          cursor: ne-resize;
        }

        &.rb {
          cursor: se-resize;
        }

        &.lb {
          cursor: sw-resize;
        }

        &.l {
          cursor: ew-resize;
        }

        &.r {
          cursor: ew-resize;
        }

        &.t {
          cursor: ns-resize;
        }

        &.b {
          cursor: ns-resize;
        }
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
      }

      #root {
        height: 0 !important;
      }
    }
  }

  svg {
    position: fixed;
    height: 2px;
    width: 2px;
    z-index: 66;

    &.left {
      transform: rotateX(180deg);
      width: 2px;
    }

    &.bottom {
      transform: rotatey(180deg);
      height: 2px;
    }

    line {
      stroke-dasharray: 8;
      stroke-dashoffset: 1000;
      animation: dash 50s linear infinite;
      stroke: #0e2231;
      stroke-width: 2;
    }

    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }
  }
}
</style>
