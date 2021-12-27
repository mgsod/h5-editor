<template>
  <div
    :id="property.id"
    class="component-wrapper"
    ref="root"
    :style="style"
    @drop="drop($event, property)"
    @dragenter="dragenter($event, property)"
    @dragleave="dragleave($event)"
    @dragover="dragover"
    @click.stop="componentSelectHandler($event, property)"
    @mousedown.stop="mouseDownEventHandler($event, property)"
    @contextmenu.stop="contextmenuHandler($event, property)"
  >
    <component :is="property.type" v-bind="property">
      <component-wrapper
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      ></component-wrapper>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, inject } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import useStyle from "@/hooks/useStyle";

export default defineComponent({
  name: "ComponentWrapper",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const mouseDownEventHandler = inject("mouseDownEventHandler");
    const contextmenuHandler = inject("contextmenuHandler");
    const componentSelectHandler = inject("componentSelectHandler");
    const { property } = toRefs(props);
    const style = useStyle(property);
    // 拖拽添加组件
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    return {
      style,
      dragenter,
      dragleave,
      dragover,
      drop,
      mouseDownEventHandler,
      contextmenuHandler,
      componentSelectHandler,
    };
  },
});
</script>

<style lang="less">
.component-wrapper {
  overflow: hidden;
  cursor: default;

  &#root {
    min-height: 100%;
    z-index: 2;
  }
}
</style>
