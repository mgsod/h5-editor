<template>
  <div
    :id="property.id"
    class="component-wrapper"
    ref="root"
    :class="{
      focused: focusedId === property.id,
    }"
    :style="style"
    @drop="drop($event, property)"
    @dragenter="dragenter($event, property)"
    @dragleave="dragleave($event, property)"
    @dragover="dragover"
    @click="select($event, property)"
    @mousedown="mouseDown($event, property)"
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
import {
  defineComponent,
  computed,
  PropType,
  ref,
  toRefs,
  onMounted,
} from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import useResize from "@/hooks/useResize";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
import HImg from "@/components/Editor/RenderComponent/Img/Img.vue";
import HContainer from "@/components/Editor/RenderComponent/Container/Container.vue";
import HText from "@/components/Editor/RenderComponent/Text/Text.vue";
import useBindEvent from "@/hooks/useBindEvent";
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
  },
  components: {
    HImg,
    HContainer,
    HText,
  },
  setup(props: IDomComponent) {
    const store = useStore();
    const { root } = useBindEvent(props.property.events);
    const { property } = toRefs(props);
    const formatPositionValues = (val?: number) => {
      if (val === 0 || val) {
        return `${val}px`;
      }
      return "";
    };
    const style = computed(() => {
      return {
        height: property.value.height ? property.value.height + "px" : "auto",
        width: property.value.width ? property.value.width + "px" : "auto",
        position: property.value.position,
        top: formatPositionValues(property.value.top),
        left: formatPositionValues(property.value.left),
        right: formatPositionValues(property.value.right),
        bottom: formatPositionValues(property.value.bottom),
        paddingTop: formatPositionValues(property.value.padding?.top),
        paddingLeft: formatPositionValues(property?.value.padding?.left),
        paddingRight: formatPositionValues(property?.value.padding?.right),
        paddingBottom: formatPositionValues(property?.value.padding?.bottom),
        marginTop: formatPositionValues(property?.value.margin?.top),
        marginLeft: formatPositionValues(property?.value.margin?.left),
        marginRight: formatPositionValues(property?.value.margin?.right),
        marginBottom: formatPositionValues(property?.value.margin?.bottom),
        borderTopWidth: formatPositionValues(property?.value.border?.top),
        borderLeftWidth: formatPositionValues(property?.value.border?.left),
        borderRightWidth: formatPositionValues(property?.value.border?.right),
        borderBottomWidth: formatPositionValues(property?.value.border?.bottom),
        borderStyle: property.value.borderStyle,
        borderColor: property.value.borderColor,
      };
    });
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const focusedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    const resizePoint = computed(() => {
      let points = ["lt", "rt", "lb", "rb", "l", "t", "r", "b"];
      // 相对定位只能拖拽r，rb，b 三个点
      if (property.value.position === "relative") {
        return points.filter(
          (item) => !["lt", "rt", "lb", "l", "t"].includes(item)
        );
      }
      return points;
    });

    const { mouseDown } = useResize();
    return {
      focusedId,
      resizePoint,
      mouseDown,
      style,
      root,
      dragenter,
      dragleave,
      dragover,
      drop,
      select: (e: Event, item: TComponent) => {
        e.stopPropagation();
        store.commit(MUTATION_TYPE.SELECT_COMPONENT, item);
      },
    };
  },
});
</script>

<style scoped lang="less">
.component-wrapper {
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
