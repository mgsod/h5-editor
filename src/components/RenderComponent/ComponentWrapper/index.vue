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
        @mousedown="mouseDown($event, item)"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import useResize from "@/hooks/useResize";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import HImg from "@/components/RenderComponent/Img/Img.vue";
import HContainer from "@/components/RenderComponent/Container/Container.vue";
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
    const { property } = reactive(props);
    const formatPositionValues = (val?: number) => {
      return val ? `${val}px` : "";
    };

    const style = computed(() => {
      return {
        height: property.height + "px",
        width: property.width + "px",
        position: property.position,
        top: formatPositionValues(property.top),
        left: formatPositionValues(property.left),
        right: formatPositionValues(property.right),
        bottom: formatPositionValues(property.bottom),
        paddingTop: formatPositionValues(property?.padding?.top),
        paddingLeft: formatPositionValues(property?.padding?.left),
        paddingRight: formatPositionValues(property?.padding?.right),
        paddingBottom: formatPositionValues(property?.padding?.bottom),
        marginTop: formatPositionValues(property?.margin?.top),
        marginLeft: formatPositionValues(property?.margin?.left),
        marginRight: formatPositionValues(property?.margin?.right),
        marginBottom: formatPositionValues(property?.margin?.bottom),
        borderTopWidth: formatPositionValues(property?.border?.top),
        borderLeftWidth: formatPositionValues(property?.border?.left),
        borderRightWidth: formatPositionValues(property?.border?.right),
        borderBottomWidth: formatPositionValues(property?.border?.bottom),
      };
    });
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const focusedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    const resizePoint = computed(() => {
      let points = ["lt", "rt", "lb", "rb", "l", "t", "r", "b"];
      // 相对定位只能拖拽r，rb，b 三个点
      if (property.position === "relative") {
        return points.filter(
          (item) => !["lt", "rt", "lb", "l", "t"].includes(item)
        );
      }
      return points;
    });

    const { mouseDown } = useResize();
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
    };
  },
});
</script>

<style scoped lang="less">
.component-wrapper {
  outline: 1px solid #ccc;
  overflow: hidden;
  &.focused {
    outline: 1px solid var(--el-color-primary);
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
  }
}
</style>
