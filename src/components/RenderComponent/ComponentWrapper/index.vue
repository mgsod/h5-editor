<template>
  <div
    class="component-wrapper"
    :style="style"
    @drop="drop($event, property)"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @dragover="dragover"
    :id="property.id"
    @click="x(property)"
  >
    <component-wrapper
      v-for="item in property.children"
      :key="item.id"
      :property="item"
    ></component-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import { Layout } from "@/components/RenderComponent/Layout";
interface IDomComponent {
  property: TComponent;
}
export default defineComponent({
  name: "ComponentWrapper",
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
    a: Number,
  },
  components: {},
  setup(props: IDomComponent) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const property = props.property;
    const style = computed(() => {
      let containerProps: Layout = {};
      if (property.isContainer) {
        containerProps = {
          display: "flex",
          textAlign: property.textAlign,
          JustifyContent: property.JustifyContent,
          AlignContent: property.AlignContent,
          AlignItems: property.AlignItems,
          AlignSelf: property.AlignSelf,
        };
      }
      return {
        height: `${props.property.height}px`,
        width: `${props.property.width}px`,
        border: `1px solid #ccc`,
        position: props.property.position,
        ...containerProps,
      };
    });
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
    return {
      style,
      dragenter,
      dragleave,
      dragover,
      drop,
      x: (item: TComponent) => {
        item.width += 10;
      },
    };
  },
});
</script>

<style scoped lang="less"></style>
