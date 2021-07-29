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
import { useStore } from "@/store";
import { onMounted } from "vue";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
export default {
  name: "Index",
  props: {},
  components: {
    Sidebar,
    PropertyBar,
    H5Canvas,
  },
  setup() {
    const store = useStore();
    store.commit(MUTATION_TYPE.INIT);
    onMounted(() => {
      document.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "KeyZ":
            if (e.ctrlKey) {
              store.commit(MUTATION_TYPE.UNDO);
            }
            break;
          case "KeyY":
            if (e.ctrlKey) {
              store.commit(MUTATION_TYPE.REDO);
            }
        }
      });
    });
  },
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
