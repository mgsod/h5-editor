<template>
  <div class="sidebar">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane name="components" label="组件">
        <div class="panel">
          <div class="panel-title">基础组件</div>
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
                      <el-dropdown-item
                        :icon="Plus"
                        divided
                        style="opacity: 0.3"
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
              <span v-if="data.events?.length > 0" title="该组件有事件">
                <el-icons class="event" name="Opportunity"></el-icons>
              </span>
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
              <div style="display: flex">
                <el-popover placement="bottom" trigger="click">
                  <template #reference>
                    <el-icons
                      class="edit"
                      name="Edit"
                      @click.stop="editPageHandle(item.id)"
                    ></el-icons>
                  </template>
                  <div class="edit-page-popover">
                    <el-input v-model="tempName" size="small"></el-input>
                    <div class="action">
                      <el-button
                        size="small"
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
      <el-tab-pane name="datasource" label="数据池">
        <datasource />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ComponentList, TComponent } from '@/components/Editor/ComponentTypes';
import { computed, ref } from 'vue';
import { useStore } from '@/store';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import cloneDeep from 'lodash/cloneDeep';
import { IComponent } from '@/components/Editor/BuiltInComponents/Component';
import {
  NodeDropType,
  TreeNodeOptions,
} from 'element-plus/lib/components/tree/src/tree.type';
import { IPage } from '@/store/Editor';
import useDrag from '@/hooks/useDrag';
import { Plus, Remove, Edit, CopyDocument } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import datasource from './datasource.vue';
export default {
  name: 'Sidebar',
  components: { datasource },
  setup() {
    const store = useStore();
    const { dragstart } = useDrag();
    const editPageId = ref('-1');
    const tempName = ref('');
    const domTree = computed(() => {
      return cloneDeep(store.getters?.currentPage?.components || []);
    });
    const selectedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });

    const pages = computed<Omit<IPage, 'components'>[]>(() => {
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
      active: ref('components'),
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
        type: NodeDropType
      ) {
        const targetNode: TComponent = dropNode.data as TComponent;
        // 如果DropType 为inner
        if (type === 'inner') {
          // 目标节点必须是一个容器
          return targetNode.isContainer;
        } else {
          // 如果是next 和prev 不能是根结点。根结点不允许有兄弟元素
          return targetNode.id !== 'root';
        }
      },
      allowDrag(draggingNode: TreeNodeOptions) {
        const data = draggingNode.data as IComponent;
        return data.id !== 'root' && !data.lock;
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
        editPageId.value = '-1';
      },
      componentHandleCommand(command: string) {
        const [action, name] = command.split('_');
        switch (action) {
          case 'delete':
            store.commit(MUTATION_TYPE.DELETE_EXTRACT_COMPONENT, name);
            break;
        }
      },
      pageHandleCommand(command: string) {
        const [action, id] = command.split('_');
        switch (action) {
          case 'copy':
            store.commit(MUTATION_TYPE.COPY_PAGE, id);
            break;
          case 'delete':
            ElMessageBox.confirm('是否删除该页面?该操作不可撤销', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
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
    margin-top: 5px;
    text-align: right;

    .el-button {
      min-height: 25px;
    }
  }
}

.sidebar {
  box-sizing: border-box;
  display: flex;
  padding: 8px 0;
  background: white;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 15%);

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
          padding-left: 5px;
          margin-bottom: 8px;
          color: #282828;
          border-left: 3px solid var(--el-color-primary-light-2);

          i {
            color: var(--el-color-warning);
            cursor: pointer;
          }
        }

        .components {
          display: flex;
          flex: auto;
          flex-wrap: wrap;
          height: auto;
          padding-right: 8px;
          cursor: default;

          .component {
            box-sizing: border-box;
            display: flex;
            flex: 0 0 65px;
            align-items: center;
            justify-content: center;
            height: 65px;
            padding: 8px;
            margin: 0 -1px -1px 0;
            font-size: 13px;
            cursor: default;
            border: 1px solid var(--el-border-color-lighter);

            &:hover {
              position: relative;
              z-index: 3;
              cursor: move;
              border: 1px solid var(--el-color-primary-light-3);
              box-shadow: var(--el-box-shadow-lighter);
            }

            &.custom {
              flex: none;
              width: 100%;
              height: 0;
              padding: 15px;
            }

            .item {
              display: flex;
              justify-content: space-between;
              width: 100%;

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
        height: 100%;
        padding-right: 8px;

        .page-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          cursor: pointer;
          border-bottom: 1px solid #f0f4f5;
          border-radius: 5px;

          &.active {
            color: #fff;
            background: var(--el-color-primary);

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
              display: inline-block;
              color: #fff;
            }
          }
        }

        .action {
          text-align: center;
        }
      }

      :deep(.el-overlay) {
        .el-dialog__body {
          height: 500px;
          overflow: auto;
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

    :deep(.el-tree-node__content) {
      padding-right: 5px;

      .el-tree-node__label {
        flex: auto;
      }
    }

    .custom-tree-node {
      display: flex;
      justify-content: space-between;

      .event {
        color: var(--el-color-warning);
      }
    }
  }
}
</style>
