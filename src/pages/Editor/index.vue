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
import Sidebar from "@/components/Editor/Sidebar/index.vue";
import PropertyBar from "@/components/Editor/SettingBar/index.vue";
import H5Canvas from "@/components/Editor/Canvas/index.vue";
import { useStore } from "@/store";
import { onMounted } from "vue";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import Header from "@/components/Editor/Header/Header.vue";

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
      store.commit(MUTATION_TYPE.SELECT_COMPONENT);
      document.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "KeyZ":
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              store.commit(MUTATION_TYPE.UNDO);
            }
            break;
          case "KeyY":
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              store.commit(MUTATION_TYPE.REDO);
            }
            break;
          case "KeyA":
            if (e.ctrlKey || e.metaKey) {
              console.log(11);
            }
            break;
          case "Backspace":
            //e.preventDefault();
            //store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
            break;
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
  }
}
</style>
