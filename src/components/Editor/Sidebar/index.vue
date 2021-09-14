<template>
  <div class="sidebar">
    <el-tabs tab-position="left">
      <el-tab-pane label="组件">
        <div class="components">
          <div
            class="component"
            draggable="true"
            @dragstart="dragstart($event, item)"
            @dragend="dragend"
            v-for="item in ComponentList"
            :key="item.type"
          >
            {{ item.name }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DOM树">
        <el-tree
          draggable
          :data="domTree"
          @node-drop="handleDrop"
          :default-expand-all="true"
          :props="{ label: 'type' }"
          :expand-on-click-node="false"
          @nodeClick="selectNode"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <template #default="{ data }">
            <span
              class="custom-tree-node"
              :class="{ selected: selectedId === data.id }"
            >
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
import { TreeNodeOptions } from "element-plus/es/el-tree/src/tree.type";
import { cloneDeep } from "lodash";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { DropType } from "element-plus/lib/el-tree/src/tree.type";
export default {
  name: "Sidebar",
  props: {},
  components: {},
  setup() {
    const store = useStore();
    const dragstart = (e: DragEvent, item: IComponentItem) => {
      (e.dataTransfer as DataTransfer).setData("type", item.type);
      store.commit(MUTATION_TYPE.DRAG_COMPONENT);
    };

    const domTree = computed(() => {
      return cloneDeep(store.getters.currentPage.components);
    });
    const selectedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    return {
      dragstart,
      ComponentList,
      active: 0,
      domTree,
      selectedId,
      selectNode(data: TComponent) {
        store.commit(MUTATION_TYPE.SELECT_COMPONENT, data);
      },
      dragend() {
        store.commit(MUTATION_TYPE.DRAG_COMPONENT, false);
      },
      handleDrop() {
        store.commit(MUTATION_TYPE.DRAG_TREE, domTree.value);
      },
      allowDrop(
        draggingNode: TComponent,
        dropNode: TreeNodeOptions,
        type: DropType
      ) {
        const targetNode: TComponent = dropNode.data as TComponent;
        // 目标如果是根结点
        if (targetNode.id === "root") {
          // 只能放在里面，不允许放在prev和next类型下
          return type === "inner";
        }
        return targetNode.isContainer;
      },
      allowDrag(draggingNode: TreeNodeOptions) {
        return (draggingNode.data as IComponent).id !== "root";
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
    :deep(.components) {
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
  .el-tree {
    user-select: none;
    .selected {
      color: var(--el-color-primary);
    }
  }
}
</style>
