<template>
  <div class="canvas-wrapper" id="canvas-wrapper">
    <div class="wrapper-grid" ref="wrapperGrid">
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
          :style="borderValues[item]"
        ></div>

        <!--        <div
                  class="enter-container-border-line"
                  v-for="item in enterContainerBorderLine"
                  :key="`border-${item}`"
                  :style="getBorderStyle(item, true)"
                ></div>-->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-for="item in borderLine"
          :key="`border-${item}`"
          :style="dashedBorderValues[item]"
          preserveAspectRatio="none"
          :class="item"
        >
          <line
            fill="none"
            x1="0"
            :x2="parseFloat(dashedBorderValues[item].width || '0')"
            y1="0"
            :y2="parseFloat(dashedBorderValues[item].height || '0')"
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
      <div class="b-resize" @mousedown="resize">
        <div class="line"></div>
        <div class="handle">
          <span></span>
        </div>
      </div>
      <div class="size-info">
        <label>画板高度 :</label>
        <el-input @input="changeHeight" v-model="wrapperHeight"></el-input>
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
import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';
import { useStore } from '@/store';
import useDragEffect from '@/hooks/useDrag';
import ComponentWrapper from '@/components/Editor/BuiltInComponents/ComponentWrapper/index.vue';
import useVirtualBorder from '@/hooks/useVirtualBorder';
import useResize from '@/hooks/useResize';
import useContextmenu from '@/hooks/useContextmenu';
import contextmenu from '@/components/Editor/Contextmenu/index.vue';
import { TComponent } from '@/components/Editor/ComponentTypes';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import { findItemById } from '@/util';
import eventBus, { EventType } from '@/hooks/useEventBus';

type IDirection = 'top' | 'right' | 'bottom' | 'left';

export default defineComponent({
  name: 'H5canvas',
  components: { ComponentWrapper, contextmenu },
  setup() {
    const { preventDefault, position, showContextmenu, closeContextmenu } =
      useContextmenu();
    const { dragenter, dragleave, drop, dragover } = useDragEffect();
    const store = useStore();
    const { borderValues, dashedBorderValues, borderStyle, borderLine } =
      useVirtualBorder();
    // 拖拽/更改组件大小位置
    const { mouseDown, resizePoint } = useResize();

    const selectComponent = (component: TComponent) => {
      // 递归向上查找未被锁定的父容器
      const target = getUnlockParent(component.id);
      store.commit(MUTATION_TYPE.SELECT_COMPONENT, target);
    };

    // 为避免递归组件中事件一层一层上传（不是原生事件冒泡，而是要获取到最里面一层的组件，需要一层层往外传，这样每一层都会触发一次事件，过于浪费）
    // 在这个组件中提供一个 mouseDownEventHandler 鼠标按下的事件给所有自组件
    // 自组件只需要inject此事件即可从事件触发时的组件直接到这一级
    provide('mouseDownEventHandler', (e: MouseEvent, component: TComponent) => {
      //e.preventDefault();
      e.stopPropagation();
      const target = getUnlockParent(component.id);
      mouseDown(e, target);
    });

    // 同上
    provide('contextmenuHandler', (e: MouseEvent, item: TComponent) => {
      preventDefault(e);
      const target = getUnlockParent(item.id);
      contextmenuComponent.value = target;
      selectComponent(target);
    });

    provide('isPreview', false);

    function getUnlockParent(id: string): TComponent {
      const component = findItemById(
        store.getters.currentPage.components,
        id
      ) as TComponent;
      if (component.lock) {
        return getUnlockParent(component.parentId as string);
      } else {
        return component;
      }
    }

    // 同上
    provide('componentSelectHandler', (e: MouseEvent, item: TComponent) => {
      e.stopPropagation();
      closeContextmenu();
      selectComponent(item);
    });
    const isDragNew = computed(() => {
      return store.state.editor.isDrag;
    });

    const wrapperGrid = ref();
    const wrapperHeight = ref(0);
    const changeHeight = () => {
      (
        wrapperGrid.value as HTMLElement
      ).style.height = `${wrapperHeight.value}px`;
      eventBus.$emit(EventType.updateBorder);
    };
    onMounted(() => {
      const $wrapper = wrapperGrid.value as HTMLElement;
      wrapperHeight.value = $wrapper.offsetHeight;
    });
    const resize = (e: MouseEvent) => {
      const { clientY: start } = e;
      const $wrapper = wrapperGrid.value as HTMLElement;
      const { offsetHeight: originHeight } = $wrapper;
      const resizeMove = (e: MouseEvent) => {
        const { clientY: end } = e;
        $wrapper.style.height = `${originHeight + (end - start)}px`;
        wrapperHeight.value = $wrapper.offsetHeight;
        eventBus.$emit(EventType.updateBorder);
      };
      const resizeEnd = () => {
        document.removeEventListener('mouseup', resizeEnd);
        document.removeEventListener('mousemove', resizeMove);
      };
      document.addEventListener('mousemove', resizeMove);
      document.addEventListener('mouseup', resizeEnd);
    };

    const contextmenuComponent = ref();
    return {
      wrapperHeight,
      wrapperGrid,
      position,
      showContextmenu,
      closeContextmenu,
      contextmenuComponent,
      mouseDown,
      store,
      borderValues,
      dashedBorderValues,
      borderStyle,
      resizePoint,
      isDragNew,
      borderLine,
      dragenter,
      dragleave,
      drop,
      dragover,
      preventDefault,
      resize,
      changeHeight,
      components: computed(() => {
        return store.getters.currentPage?.components || [];
      }),
      selectedComponentId: computed(() => {
        return store.state.editor.selectedComponents?.id;
      }),
      getPointStyle(flag: string) {
        let {
          left = '',
          top = '',
          height = '',
          width = '',
        } = borderStyle.value;
        left = parseFloat(left) - 1.5 + 'px';
        top = parseFloat(top) - 1.5 + 'px';
        width = parseFloat(width) - 1.5 + 'px';
        height = parseFloat(height) - 1.5 + 'px';
        const maxWidth = `${parseFloat(left) + parseFloat(width)}px`;
        const halfWidth = `${parseFloat(left) + parseFloat(width) / 2}px`;
        const maxHeight = `${parseFloat(top) + parseFloat(height)}px`;
        const halfHeight = `${parseFloat(top) + parseFloat(height) / 2}px`;
        switch (flag) {
          case 'lt':
            return {
              left: left,
              top,
            };
          case 'rt':
            return {
              left: maxWidth,
              top,
            };
          case 'rb':
            return {
              left: maxWidth,
              top: maxHeight,
            };
          case 'lb':
            return {
              left,
              top: maxHeight,
            };
          case 'l':
            return {
              left,
              top: halfHeight,
            };
          case 'r':
            return {
              left: maxWidth,
              top: halfHeight,
            };
          case 't':
            return {
              left: halfWidth,
              top,
            };
          case 'b':
            return {
              left: halfWidth,
              top: maxHeight,
            };
        }
      },
    };
  },
});
</script>

<style scoped lang="less">
.canvas-wrapper {
  display: flex;
  justify-content: center;
  overflow: scroll;
  user-select: none;

  .wrapper-grid {
    position: relative;
    width: 375px;
    height: 667px;
    margin: 50px 0;
    background-color: white;
    background-image: linear-gradient(
        90deg,
        rgba(50, 0, 0, 5%) 3%,
        rgba(0, 0, 0, 0%) 3%
      ),
      linear-gradient(360deg, rgba(50, 0, 0, 5%) 3%, rgba(0, 0, 0, 0%) 3%);
    background-repeat: repeat;
    background-size: 20px 20px;

    .canvas {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow-y: auto;

      // 在编辑器里面，h-container超出可以滚动
      :deep(.component-wrapper) {
        .h-container {
          overflow: auto;
        }
      }

      .border-line {
        position: fixed;
        z-index: 2;
        border-top: 1px solid var(--el-color-primary);
        border-left: 1px solid var(--el-color-primary);

        &.transition {
          transition: all 0.2s;
        }
      }

      .enter-container-border-line {
        position: fixed;
        z-index: 2;
        border-top: 1px dashed var(--el-color-warning);
        border-left: 1px dashed var(--el-color-warning);
      }

      .point {
        position: fixed;
        z-index: 2;
        width: 6px;
        height: 6px;
        background: #fff;
        border: 1px solid #59c7f9;
        border-radius: 50%;

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
        z-index: 2;
        outline: 1px solid var(--el-color-primary);

        .point {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #fff;
          border: 1px solid #59c7f9;
          border-radius: 50%;

          &.lt {
            top: 0;
            left: 0;
            margin-top: -3px;
            margin-left: -3px;
            cursor: nw-resize;
          }

          &.rt {
            top: 0;
            right: 0;
            margin-top: -3px;
            margin-right: -3px;
            cursor: ne-resize;
          }

          &.rb {
            right: 0;
            bottom: 0;
            margin-right: -3px;
            margin-bottom: -3px;
            cursor: se-resize;
          }

          &.lb {
            bottom: 0;
            left: 0;
            margin-bottom: -3px;
            margin-left: -3px;
            cursor: sw-resize;
          }

          &.l {
            top: calc(50% - 3px);
            left: 0;
            margin-left: -4px;
            cursor: ew-resize;
          }

          &.r {
            top: calc(50% - 3px);
            right: 0;
            margin-right: -4px;
            cursor: ew-resize;
          }

          &.t {
            top: 0;
            left: calc(50% - 3px);
            margin-top: -4px;
            cursor: ns-resize;
          }

          &.b {
            bottom: 0;
            left: calc(50% - 3px);
            margin-bottom: -4px;
            cursor: ns-resize;
          }
        }
      }

      #root {
        height: 0 !important;
      }
    }

    .b-resize {
      cursor: ns-resize;

      .line {
        height: 3px;
        background-color: #fff;
      }

      .handle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 10px;
        margin: 0 auto;
        background-color: #fff;

        span {
          display: inline-block;
          width: 10px;
          height: 1px;
          background-color: #999;
        }
      }

      &:hover {
        .line,
        .handle {
          background-color: var(--el-color-warning);

          span {
            background-color: #fff;
          }
        }
      }
    }

    .size-info {
      display: flex;
      align-items: center;
      width: 130px;
      margin: 5px auto 0;

      label {
        flex: 0 0 60px;
        font-size: 12px;
        color: #999;
      }

      .el-input {
        flex: auto;
      }
    }
  }

  svg {
    position: fixed;
    z-index: 66;
    width: 2px;
    height: 2px;

    &.left {
      width: 2px;
      transform: rotateX(180deg);
    }

    &.bottom {
      height: 2px;
      transform: rotateY(180deg);
    }

    line {
      stroke: #0e2231;
      stroke-dasharray: 8;
      stroke-dashoffset: 1000;
      stroke-width: 2;
      animation: dash 50s linear infinite;
    }

    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }
  }
}
</style>
