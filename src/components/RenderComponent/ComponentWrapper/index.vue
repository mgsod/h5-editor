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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
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
    };
  },
});
</script>

<style scoped lang="less">
.component-wrapper {
  outline: 1px solid #ccc;
  &.focused {
    outline: 2px solid var(--el-color-primary);
  }
}
</style>
