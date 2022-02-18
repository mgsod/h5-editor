<template>
  <div
    :id="property.id"
    class="component-wrapper"
    :style="style"
    :data-type="property.type"
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
import { TComponent } from "@/components/Editor/ComponentTypes";
import useDragEffect from "@/hooks/useDrag";
import useStyle from "@/hooks/useStyle";
import NoticeBar from "@/components/Editor/TrilateralComponents/Vant/NoticeBar/index.vue";

export default defineComponent({
  name: "ComponentWrapper",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
  },
  components: { NoticeBar },
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
  //overflow: hidden;
  cursor: default;

  &[data-type="HText"] {
    display: inline-block;
  }

  &#root {
    min-height: 100%;
    z-index: 2;
  }
}
</style>
