<template>
  <div class="sidebar">
    <div class="components">
      <div
        class="component"
        draggable="true"
        @dragstart="dragstart($event, item)"
        v-for="item in ComponentList"
        :key="item.type"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentList,
  IComponentItem,
} from "@/components/RenderComponent/types";

export default {
  name: "Sidebar",
  props: {},
  components: {},
  setup() {
    const dragstart = (e: DragEvent, item: IComponentItem) => {
      e.dataTransfer!.setData("type", item.type);
    };
    return {
      dragstart,
      ComponentList,
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
      height: 50px;
      padding: 8px;
      border: 1px solid #ccc;
      cursor: default;
    }
  }
}
</style>
