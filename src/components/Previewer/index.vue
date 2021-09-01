<template>
  <component-wrapper
    v-for="item in components"
    :key="item.id"
    :property="item"
  />
</template>

<script lang="ts">
import ComponentWrapper from "@/components/Editor/RenderComponent/ComponentWrapper/index.vue";
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "index",
  props: {},
  components: { ComponentWrapper },
  setup() {
    const store = useStore();
    return {
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
    };
  },
});
</script>

<style scoped lang="less"></style>
