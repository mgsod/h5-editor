<template>
  <div class="dom-render">
    <render
      :rem="rem"
      v-for="item in components"
      :key="item.id"
      :property="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Render from "./render.vue";
import { useStore } from "@/store";
export default defineComponent({
  name: "previewer",
  inheritAttrs: false,
  props: {
    rem: {
      type: Boolean,
      default: true,
    },
  },
  components: { Render },
  setup(props) {
    const store = useStore();
    return {
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
    };
  },
});
</script>

<style scoped lang="less">
.dom-render {
  height: 100%;
  & > div {
    min-height: 100%;
  }
}
</style>
