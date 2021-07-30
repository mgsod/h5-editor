<template>
  <div class="header"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {},
  components: {},
  setup() {},
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
}
</style>
