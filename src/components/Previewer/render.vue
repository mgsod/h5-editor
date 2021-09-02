<template>
  <div ref="root" :id="property.id" class="component-wrapper" :style="style">
    <component :is="property.type" v-bind="property">
      <render
        :rem="rem"
        v-for="item in property.children"
        :key="item.id"
        :property="item"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs } from "vue";
import { useStore } from "@/store";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import useStyle from "@/hooks/useStyle";
import HImg from "@/components/Editor/RenderComponent/Img/Img.vue";
import HContainer from "@/components/Editor/RenderComponent/Container/Container.vue";
import HText from "@/components/Editor/RenderComponent/Text/Text.vue";
import useBindEvent from "@/hooks/useBindEvent";

export default defineComponent({
  name: "render",
  inheritAttrs: false,
  props: {
    property: {
      type: Object as PropType<TComponent>,
      required: true,
    },
    rem: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    HImg,
    HContainer,
    HText,
  },
  setup(props) {
    const store = useStore();
    const { property } = toRefs(props);
    const style = useStyle(property, props.rem);
    const { root } = useBindEvent(props.property.events);
    return {
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
      style,
      root,
    };
  },
});
</script>
