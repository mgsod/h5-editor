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
    @contextmenu="contextmenu($event, property)"
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
import { defineComponent, computed, PropType, toRefs, ref } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import useStyle from "@/hooks/useStyle";
import useContextmenu from "@/hooks/useContextmenu";
import contextmenu from "@/components/Editor/Contextmenu/index.vue";
import { IComponent } from "@/components/Editor/RenderComponent/Component";

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
    contextmenu,
  },
  emits: ["mousedown", "contextmenu"],
  setup(props, { emit }) {
    const { preventDefault, position, showContextmenu, closeContextmenu } =
      useContextmenu();
    const store = useStore();
    const { property } = toRefs(props);
    const style = useStyle(property);
    // 拖拽添加组件
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    const focusedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    const contextmenuComponent = ref();
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
        console.log(222);
        emit("mousedown", e);
      },
      contextmenu(e: MouseEvent, item: IComponent) {
        e.stopPropagation();
        console.log("22", item);
        emit("contextmenu", e, item);
      },
      showContextmenu,
      contextmenuComponent,
      position,
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
