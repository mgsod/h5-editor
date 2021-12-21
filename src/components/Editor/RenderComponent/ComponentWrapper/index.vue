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
    @click="select($event, property)"
    @mousedown="mousedown"
  >
    <component :is="property.type" v-bind="property">
      <component-wrapper
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      ></component-wrapper>
    </component>
    <template v-if="focusedId === property.id && property.id !== 'root'">
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import useResize from "@/hooks/useResize";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import useStyle from "@/hooks/useStyle";
import useContextmenu from "@/hooks/useContextmenu";

export default defineComponent({
  name: "ComponentWrapper",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
  },
  emits: ["mousedown"],
  setup(props, { emit }) {
    const { closeContextmenu } = useContextmenu();
    const store = useStore();
    const { property } = toRefs(props);
    const style = useStyle(property);
    // 拖拽添加组件
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const focusedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    return {
      focusedId,
      style,
      dragenter,
      dragleave,
      dragover,
      drop,
      select: (e: Event, item: TComponent) => {
        e.stopPropagation();
        closeContextmenu();
        store.commit(MUTATION_TYPE.SELECT_COMPONENT, item);
      },
      mousedown(e: Event) {
        emit("mousedown", e);
      },
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
