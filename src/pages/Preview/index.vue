<template>
  <div class="page">
    <previewer />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import Previewer from "@/components/Previewer/index.vue";
export default defineComponent({
  name: "index",
  props: {},
  components: { Previewer },
  setup() {},
});
</script>

<style scoped lang="less">
.page {
  background: #fff;
  height: 500px;
  width: 300px;
  box-sizing: content-box !important;
  border-top: 40px solid #ccc;
  border-bottom: 40px solid #ccc;
  border-left: 20px solid #ccc;
  border-right: 20px solid #ccc;
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 300px);
  overflow: auto;
}
</style>
