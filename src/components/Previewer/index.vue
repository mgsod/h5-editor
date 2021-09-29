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
import { defineComponent } from "vue";
import Render from "./render.vue";
export default defineComponent({
  name: "previewer",
  inheritAttrs: false,
  props: {
    rem: {
      type: Boolean,
      default: true,
    },
    components: {
      type: Array,
      default: () => [],
    },
  },
  components: { Render },
  setup() {},
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
