<template>
  <div class="editor">
    <Header />
    <div class="content">
      <sidebar />
      <H5Canvas />
      <property-bar />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar/index.vue";
import PropertyBar from "@/components/SettingBar/index.vue";
import H5Canvas from "@/components/Canvas/index.vue";
import { useStore } from "@/store";
import { onMounted } from "vue";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import Header from "@/components/Header/Header.vue";
export default {
  name: "Index",
  props: {},
  components: {
    Sidebar,
    PropertyBar,
    H5Canvas,
    Header,
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
  position: relative;
  background: #eef2f7;
  display: flex;
  flex-direction: column;
  .header {
    flex: 0 0 45px;
  }
  .content {
    flex: auto;
    display: flex;
    position: relative;
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
}
</style>
