<template>
  <div class="sidebar">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane name="components" label="组件">
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
      <el-tab-pane name="domTree" label="DOM树">
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
      <el-tab-pane name="pages" label="页面">
        <div class="pages">
          <div class="page-list">
            <div
              class="page-item"
              :class="{ active: item.id === activePageId }"
              v-for="item in pages"
              :key="item.id"
              @click="selectPage(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="addPage">新增页面</el-button>
          </div>
        </div>
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
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { cloneDeep } from "lodash";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import {
  DropType,
  TreeNodeOptions,
} from "element-plus/lib/components/tree/src/tree.type";
import { IPage } from "@/store/Editor";
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

    const pages = computed<Omit<IPage, "components">[]>(() => {
      return store.state.editor.pages.map((item) => {
        return {
          id: item.id,
          order: item.order,
          name: item.name,
        };
      });
    });
    return {
      dragstart,
      ComponentList,
      pages,
      active: ref("pages"),
      domTree,
      selectedId,
      activePageId: computed(() => {
        return store.state.editor.pageActive;
      }),
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
        // 如果DropType 为inner
        if (type === "inner") {
          // 目标节点必须是一个容器
          return targetNode.isContainer;
        } else {
          // 如果是next 和prev 不能是根结点。根结点不允许有兄弟元素
          return targetNode.id !== "root";
        }
      },
      allowDrag(draggingNode: TreeNodeOptions) {
        return (draggingNode.data as IComponent).id !== "root";
      },
      addPage() {
        store.commit(MUTATION_TYPE.ADD_PAGE);
      },
      selectPage(id: string) {
        store.commit(MUTATION_TYPE.SELECT_PAGE, id);
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
    :deep(.el-tabs__content),
    .el-tab-pane {
      height: 100%;
      & > div {
        height: 100%;
      }
      .components {
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
      .pages {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 8px;
        .page-item {
          padding: 10px 8px;
          border-bottom: 1px solid #f0f4f5;
          border-radius: 5px;
          cursor: pointer;
          &.active {
            background: var(--el-color-primary);
            color: #fff;
          }
        }
        .action {
          text-align: center;
        }
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
