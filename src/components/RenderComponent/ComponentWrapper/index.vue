<template>
  <div
    class="component-wrapper"
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
import { defineComponent, computed, PropType } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import useDragEffect from "@/hooks/useDrag";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import Img from "@/components/RenderComponent/Img/Img.vue";
import Container from "@/components/RenderComponent/Container/Container.vue";
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
  components: {
    Img,
    Container,
  },
  setup(props: IDomComponent) {
    const store = useStore();
    // eslint-disable-next-line vue/no-setup-props-destructure
    const property = props.property;

    const height = computed(() => {
      let height = props.property.height;
      return typeof height === "number" ? `${height}px` : height;
    });
    const width = computed(() => {
      let width = props.property.width;
      return typeof width === "number" ? `${width}px` : width;
    });
    const style = computed(() => {
      return {
        height: height.value,
        width: width.value,
        border: `1px solid #ccc`,
        position: props.property.position,
      };
    });
    const { dragenter, dragleave, dragover, drop } = useDragEffect();
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
    };
  },
});
</script>

<style scoped lang="less"></style>
