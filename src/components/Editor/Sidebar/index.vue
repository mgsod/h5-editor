<template>
  <div class="sidebar">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane name="components" label="组件">
        <div class="panel">
          <div class="panel-title">基本组件</div>
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
        </div>
        <div class="panel">
          <div class="panel-title">
            自定义组件
            <el-popover
              placement="top-start"
              title="提示"
              :width="260"
              trigger="hover"
              content=""
            >
              <template #reference>
                <el-icons name="questionFilled" />
              </template>
              <div>
                右键一个组件，选择
                <span style="color: var(--el-color-primary)"> 做成组件 </span>
                即可生成自定义组件
              </div>
            </el-popover>
          </div>
          <div class="components">
            <div
              class="component custom"
              draggable="true"
              @dragstart="dragstart($event, item, true)"
              @dragend="dragend"
              v-for="item in extractComponents"
              :key="item.name"
            >
              <div class="item">
                <span>
                  {{ item.name }}
                </span>
                <el-dropdown trigger="click" @command="componentHandleCommand">
                  <span class="el-dropdown-link">
                    <el-icons name="ArrowDown" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- <el-dropdown-item :command="delet" :icon="Edit">删除</el-dropdown-item> -->
                      <el-dropdown-item
                        :command="`delete_${item.name}`"
                        :icon="Remove"
                        >删除
                      </el-dropdown-item>
                      <el-dropdown-item :icon="Plus" divided
                        >添加到组件库
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="domTree" label="DOM树">
        <el-tree
          draggable
          :data="domTree"
          @node-drop="handleDrop"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @nodeClick="selectNode"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <template #default="{ data }">
            <span
              class="custom-tree-node"
              :class="{ selected: selectedId === data.id, disabled: data.lock }"
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
              <span class="name">{{ item.name }}</span>
              <div>
                <el-popover placement="bottom" trigger="click">
                  <template #reference>
                    <el-icons
                      class="edit"
                      name="Edit"
                      @click.stop="editPageHandle(item.id)"
                    ></el-icons>
                  </template>
                  <div class="edit-page-popover">
                    <el-input v-model="tempName" size="mini"></el-input>
                    <div class="action">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="submitEditPage"
                        >确认
                      </el-button>
                    </div>
                  </div>
                </el-popover>
                <el-dropdown trigger="click" @command="pageHandleCommand">
                  <span class="el-dropdown-link">
                    <el-icons name="ArrowDown" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        :command="`copy_${item.id}`"
                        :icon="CopyDocument"
                        >复制
                      </el-dropdown-item>
                      <el-dropdown-item
                        :command="`delete_${item.id}`"
                        :icon="Remove"
                        >删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="addPage">新增页面</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="dynamicVars" label="数据池"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ComponentList, TComponent } from "@/components/Editor/ComponentTypes";
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import cloneDeep from "lodash/cloneDeep";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import {
  DropType,
  TreeNodeOptions,
} from "element-plus/lib/components/tree/src/tree.type";
import { IPage } from "@/store/Editor";
import useDrag from "@/hooks/useDrag";
import { Plus, Remove, Edit, CopyDocument } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

export default {
  name: "Sidebar",
  setup() {
    const store = useStore();
    const { dragstart } = useDrag();
    const editPageId = ref("-1");
    const tempName = ref("");
    const domTree = computed(() => {
      return cloneDeep(store.getters?.currentPage?.components || []);
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
      Edit,
      Plus,
      Remove,
      CopyDocument,
      tempName,
      dragstart,
      ComponentList,
      pages,
      active: ref("components"),
      domTree,
      selectedId,
      activePageId: computed(() => {
        return store.state.editor.pageActive;
      }),
      selectNode(data: TComponent) {
        if (data.lock) return;
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
        const data = draggingNode.data as IComponent;
        return data.id !== "root" && !data.lock;
      },
      addPage() {
        store.commit(MUTATION_TYPE.ADD_PAGE);
      },
      selectPage(id: string) {
        store.commit(MUTATION_TYPE.SELECT_PAGE, id);
      },
      extractComponents: computed(() => {
        return store.getters.extractComponents;
      }),
      editPageHandle(id: string) {
        tempName.value = (
          pages.value.find((item) => item.id === id) as IPage
        ).name;
        editPageId.value = id;
      },
      submitEditPage() {
        store.commit(
          MUTATION_TYPE.EDIT_PAGE,
          cloneDeep({
            ...pages.value.find((item) => item.id === editPageId.value),
            name: tempName.value,
          })
        );
        editPageId.value = "-1";
      },
      componentHandleCommand(command: string) {
        const [action, name] = command.split("_");
        switch (action) {
          case "delete":
            store.commit(MUTATION_TYPE.DELETE_EXTRACT_COMPONENT, name);
            break;
        }
      },
      pageHandleCommand(command: string) {
        const [action, id] = command.split("_");
        switch (action) {
          case "copy":
            store.commit(MUTATION_TYPE.COPY_PAGE, id);
            break;
          case "delete":
            ElMessageBox.confirm("是否删除该页面?该操作不可撤销", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              store.commit(MUTATION_TYPE.DELETE_PAGE, id);
            });

            break;
        }
      },
    };
  },
};
</script>

<style scoped lang="less">
.edit-page-popover {
  .action {
    text-align: right;
    margin-top: 5px;

    .el-button {
      min-height: 25px;
    }
  }
}

.sidebar {
  display: flex;
  box-sizing: border-box;
  background: white;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  padding: 8px 0;

  .el-tabs {
    flex: 0 0 300px;
    width: 100%;

    :deep(.el-tabs__content) {
      height: 100%;
      overflow: auto;
    }

    .el-tab-pane {
      height: 100%;

      .panel {
        margin-bottom: 20px;

        .panel-title {
          margin-bottom: 8px;
          color: #282828;
          border-left: 3px solid var(--el-color-primary-light-2);
          padding-left: 5px;

          i {
            cursor: pointer;
            color: var(--el-color-warning);
          }
        }

        .components {
          flex: auto;
          display: flex;
          flex-wrap: wrap;
          cursor: default;
          height: auto;
          padding-right: 8px;

          .component {
            flex: 0 0 65px;
            height: 65px;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid var(--el-border-color-lighter);
            cursor: default;
            margin: 0 -1px -1px 0;
            font-size: 13px;

            &:hover {
              border: 1px solid var(--el-color-primary-light-2);
              position: relative;
              z-index: 2;
            }

            &.custom {
              width: 100%;
              flex: none;
              height: 0;
              padding: 15px;
            }

            .item {
              display: flex;
              width: 100%;
              justify-content: space-between;

              :deep(.el-dropdown) {
                .el-dropdown-link {
                  i {
                    float: right;
                  }
                }
              }
            }
          }
        }
      }

      .pages {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 8px;
        height: 100%;

        .page-item {
          padding: 10px 8px;
          border-bottom: 1px solid #f0f4f5;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &.active {
            background: var(--el-color-primary);
            color: #fff;

            i {
              color: #fff;
            }
          }

          i {
            margin-left: 5px;

            &.edit {
              display: none;
            }
          }

          &:hover {
            i.edit {
              color: #fff;
              display: inline-block;
            }
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

    .disabled {
      color: var(--el-color-info-light);
    }
  }
}
</style>
