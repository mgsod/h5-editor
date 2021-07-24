<template>
  <div class="editor">
    <sidebar />
    <H5Canvas />
    <property-bar />
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar/index.vue";
import PropertyBar from "@/components/PropertyBar/index.vue";
import H5Canvas from "@/components/Canvas/index.vue";
export default {
  name: "Editor",
  props: {},
  components: {
    Sidebar,
    PropertyBar,
    H5Canvas,
  },
  setup() {},
};
</script>

<style scoped lang="less">
.editor {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  position: relative;
  overflow: hidden;
  background: #eef2f7;
  .sidebar {
    flex: 0 0 300px;
    box-sizing: border-box;
  }
  .canvas-wrapper {
    flex: auto;
  }
  .property {
    flex: 0 0 300px;
    box-sizing: border-box;
  }
}
</style>
