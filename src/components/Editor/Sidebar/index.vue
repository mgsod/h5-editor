<template>
  <div class="sidebar">
    <el-tabs tab-position="left">
      <el-tab-pane label="组件">
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
      </el-tab-pane>
      <el-tab-pane label="DOM树">
        <el-tree
          :data="domTree"
          :default-expand-all="true"
          :props="{ label: 'type' }"
          :expand-on-click-node="false"
          @nodeClick="selectNode"
        >
          <template #default="{ data }">
            <span class="custom-tree-node">
              <span>{{ data.alias || data.type }}</span>
            </span>
          </template>
        </el-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {
  ComponentList,
  IComponentItem,
  TComponent,
} from "@/components/Editor/RenderComponent/types";
import { computed } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";

export default {
  name: "Sidebar",
  props: {},
  components: {},
  setup() {
    const dragstart = (e: DragEvent, item: IComponentItem) => {
      e.dataTransfer!.setData("type", item.type);
    };
    const store = useStore();
    const domTree = computed(() => {
      return store.getters.currentPage.components;
    });
    return {
      dragstart,
      ComponentList,
      active: 0,
      domTree,
      selectNode(data: TComponent) {
        store.commit(MUTATION_TYPE.SELECT_COMPONENT, data);
      },
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
  padding: 8px 0;
  .el-tabs {
    flex: 0 0 300px;
    width: 100%;
    /deep/.components {
      flex: auto;
      display: flex;
      flex-wrap: wrap;
      cursor: default;
      .component {
        flex: 0 0 65px;
        height: 65px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #ccc;
        cursor: default;
        margin: 0 -1px 0px 0;
      }
    }
  }
}
</style>
