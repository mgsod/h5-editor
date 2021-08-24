<template>
  <div
    class="component-wrapper"
    :class="{
      focused: focusedId === property.id,
    }"
    :style="style"
    @drop="drop($event, property)"
    @dragenter="dragenter($event, property)"
    @dragleave="dragleave($event, property)"
    @dragover="dragover"
    :id="property.id"
    :type="property.type"
    @click="select($event, property)"
  >
    <component :is="property.type" v-bind="property">
      <component-wrapper
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      ></component-wrapper>
    </component>
    <template v-if="focusedId === property.id && property.id !== 'root'">
      <div
        class="point"
        :class="item"
        v-for="item in resizePoint"
        :key="item"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, watch } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import useResize from "@/hooks/useResize";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import HImg from "@/components/RenderComponent/Img/Img.vue";
import HContainer from "@/components/RenderComponent/Container/Container.vue";
import Component from "@/components/RenderComponent/Component";
interface IDomComponent {
  property: TComponent;
}
export default defineComponent({
  name: "ComponentWrapper",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
    a: Number,
  },
  components: {
    HImg,
    HContainer,
  },
  setup(props: IDomComponent) {
    const store = useStore();
    const style = computed(() => {
      return {
        height: props.property.height + "px",
        width: props.property.width + "px",
        position: props.property.position,
      };
    });
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const focusedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    const resizePoint = ["lt", "rt", "lb", "rb", "l", "t", "r", "b"];
    const { mouseDown, mouseMove, mouseUp, offsetY, offsetX } = useResize();
    watch([offsetX, offsetY], () => {
      const component = store.state.editor.selectedComponents;
      const { width, height } = component as Component;
      store.commit(MUTATION_TYPE.UPDATE_COMPONENT, {
        ...component,
        width: width + offsetX.value,
        height: height + offsetY.value,
      });
    });
    return {
      style,
      dragenter,
      dragleave,
      dragover,
      drop,
      select: (e: Event, item: TComponent) => {
        e.stopPropagation();
        store.commit(MUTATION_TYPE.SELECT_COMPONENT, item);
      },
      focusedId,
      resizePoint,
      mouseDown,
      mouseMove,
      mouseUp,
    };
  },
});
</script>

<style scoped lang="less">
.component-wrapper {
  border: 1px solid #ccc;
  &.focused {
    border: 1px solid var(--el-color-primary);
    .point {
      position: absolute;
      background: #fff;
      border: 1px solid #59c7f9;
      width: 6px;
      height: 6px;
      z-index: 1;
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
        cursor: se-resize;
      }
      &.l {
        margin-left: -4px;
        left: 0;
        top: calc(50% - 3px);
        cursor: w-resize;
      }
      &.r {
        margin-right: -4px;
        right: 0;
        top: calc(50% - 3px);
        cursor: e-resize;
      }
      &.t {
        margin-top: -4px;
        left: calc(50% - 3px);
        top: 0;
        cursor: n-resize;
      }
      &.b {
        margin-bottom: -4px;
        left: calc(50% - 3px);
        bottom: 0;
        cursor: n-resize;
      }
    }
  }
}
</style>
