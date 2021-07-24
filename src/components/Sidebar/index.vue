<template>
  <div class="sidebar">
    <div class="page-menu">
      <div class="page" v-for="item in 100" :key="item">页面{{ item + 1 }}</div>
    </div>
    <div class="components">
      <div
        class="component"
        draggable="true"
        @dragstart="dragstart"
        v-for="item in 50"
        :key="item"
      >
        组件{{ item + 1 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Sidebar",
  props: {},
  components: {},
  setup() {
    const dragstart = (e: DragEvent) => {
      e.dataTransfer!.setData("x", "1");
    };
    return {
      dragstart,
    };
  },
};
</script>

<style scoped lang="less">
.sidebar {
  display: flex;
  box-sizing: border-box;
  background: white;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  .page-menu {
    flex: 0 0 70px;
    border-right: 1px solid #ccd5db;
    overflow-y: auto;
    .page {
      text-align: center;
      padding: 10px 0;
      transition: all 0.3s;
      cursor: pointer;
      &.active,
      &:hover {
        color: #fff;
        background: #1593ff;
      }
    }
  }
  .components {
    flex: auto;
    display: flex;
    flex-wrap: wrap;
    cursor: default;
    .component {
      flex: 1 1 50px;
      padding: 8px;
      border: 1px solid #ccc;
      cursor: default;
    }
  }
}
</style>
