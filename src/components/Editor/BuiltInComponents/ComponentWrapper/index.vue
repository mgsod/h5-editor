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
    <component :is="property.type" v-bind="property" @updateProps="updateProps">
      <component-wrapper
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, inject } from "vue";
import { TComponent } from "@/components/Editor/ComponentTypes";
import useDragEffect from "@/hooks/useDrag";
import useStyle from "@/hooks/useStyle";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import cloneDeep from "lodash/cloneDeep";

export default defineComponent({
  name: "ComponentWrapper",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
  },
  setup(props) {
    const mouseDownEventHandler = inject("mouseDownEventHandler");
    const contextmenuHandler = inject("contextmenuHandler");
    const componentSelectHandler = inject("componentSelectHandler");
    const { property } = toRefs(props);
    const style = useStyle(property);
    const store = useStore();
    // 拖拽添加组件
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const updateProps = (props: TComponent) => {
      const target = cloneDeep({
        ...property.value,
        ...props,
      });
      store.commit(MUTATION_TYPE.UPDATE_COMPONENT, target);
    };
    return {
      style,
      dragenter,
      dragleave,
      dragover,
      drop,
      updateProps,
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
