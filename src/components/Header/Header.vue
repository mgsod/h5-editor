<template>
  <div class="header" @click="exportJson">导出JSON</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { downLoadContent } from "@/util";

export default defineComponent({
  name: "Header",
  props: {},
  components: {},
  setup() {
    const store = useStore();
    return {
      exportJson() {
        downLoadContent(
          `${new Date().getTime()}.json`,
          JSON.stringify(store.state.editor.pages)
        );
      },
    };
  },
});
</script>

<style scoped lang="less">
.header {
  font-size: 14px;
  height: 65px;
  background-color: #001529;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
</style>
