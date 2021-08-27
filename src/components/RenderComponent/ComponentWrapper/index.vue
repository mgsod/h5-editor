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
import { areaKey, positionKey } from "@/components/AroundValue/AroundValue.vue";
import { Border, Margin, Padding } from "@/components/RenderComponent/Layout";
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
    const positionKey: positionKey[] = ["top", "right", "bottom", "left"];
    const positionValues: Record<positionKey, string> = {
      left: "",
      right: "",
      top: "",
      bottom: "",
    };
    const paddingValues: Record<Padding, string> = {
      "padding-top": "",
      "padding-right": "",
      "padding-bottom": "",
      "padding-left": "",
    };
    const paddingKey: Padding[] = [
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
    ];
    const marginKey: Margin[] = [
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
    ];
    const marginValues: Record<Margin, string> = {
      "margin-top": "",
      "margin-right": "",
      "margin-bottom": "",
      "margin-left": "",
    };

    const borderKey: Border[] = [
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
    ];
    const borderValues: Record<Border, string> = {
      "border-top-width": "",
      "border-right-width": "",
      "border-bottom-width": "",
      "border-left-width": "",
    };

    const getPositionValues = (area: areaKey) => {
      if (area === "position") {
        positionKey.forEach((item: positionKey) => {
          positionValues[item] = formatPositionValues(property[item]);
        });
        return positionValues;
      } else {
        switch (area) {
          case "border":
            borderKey.forEach((item: Border, index) => {
              borderValues[item] = formatPositionValues(
                property["border"]
                  ? property["border"][positionKey[index]]
                  : undefined
              );
            });
            return borderValues;
          case "padding":
            paddingKey.forEach((item: Padding, index) => {
              paddingValues[item] = formatPositionValues(
                property["padding"]
                  ? property["padding"][positionKey[index]]
                  : undefined
              );
            });
            return paddingValues;
          case "margin":
            marginKey.forEach((item: Margin, index) => {
              marginValues[item] = formatPositionValues(
                property["margin"]
                  ? property["margin"][positionKey[index]]
                  : undefined
              );
            });
            return marginValues;
        }
      }
    };

    const style = computed(() => {
      return {
        height: property.height + "px",
        width: property.width + "px",
        position: property.position,
        ...getPositionValues("position"),
        ...getPositionValues("border"),
        ...getPositionValues("margin"),
        ...getPositionValues("padding"),
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
