<template>
  <div ref="root" :id="property.id" class="component-wrapper" :style="style">
    <component :is="property.type" v-bind="property">
      <render
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useStyle from "@/hooks/useStyle";
import useBindEvent from "@/hooks/useBindEvent";

export default defineComponent({
  name: "render",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
  },
  setup(props) {
    const { property } = toRefs(props);
    const style = useStyle(property);
    const { root } = useBindEvent(props.property.events);
    return {
      style,
      root,
    };
  },
});
</script>
