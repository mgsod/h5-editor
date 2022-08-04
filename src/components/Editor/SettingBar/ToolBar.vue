<template>
  <div class="toolbar">
    <div class="tool-item" :class="{ disabled: !allowUndo }" @click="undo">
      <div class="icon">
        <el-icons name="RefreshLeft" />
      </div>
      <div>撤销</div>
    </div>
    <div class="tool-item" :class="{ disabled: !allowRedo }" @click="redo">
      <div class="icon">
        <el-icons name="RefreshRight" />
      </div>
      <div>重做</div>
    </div>
    <div class="tool-item" :class="{ disabled: !hasSelected }" @click="del">
      <div class="icon del">
        <el-icons name="Delete" />
      </div>
      <div>删除</div>
    </div>
    <div class="tool-item" @click="preview">
      <div class="icon">
        <el-icons name="View" />
      </div>
      <div>预览</div>
    </div>
  </div>
  <preview-dialog v-model="showDialog" :pages="pages" :home-page="homePage" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import previewDialog from '@/components/Previewer/previewDialog.vue';
import useDialog from '@/hooks/useDialog';

export default defineComponent({
  name: 'ToolBar',
  props: {},
  components: { previewDialog },
  setup() {
    const store = useStore();
    const allowUndo = computed(() => {
      return store.state.editor.allowUndo;
    });
    const allowRedo = computed(() => {
      return store.state.editor.allowRedo;
    });
    const { showDialog } = useDialog();
    return {
      allowUndo,
      allowRedo,
      hasSelected: computed(() => {
        const selected = store.state.editor.selectedComponents;
        if (!selected) return false;
        return selected.id !== 'root';
      }),
      undo() {
        store.commit(MUTATION_TYPE.UNDO);
      },
      redo() {
        store.commit(MUTATION_TYPE.REDO);
      },
      del() {
        store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
      },
      preview() {
        showDialog.value = true;
      },
      pages: computed(() => {
        return store.state.editor.pages;
      }),
      homePage: computed(() => {
        return store.state.editor.pageActive;
      }),
      showDialog,
    };
  },
});
</script>
<style scoped lang="less">
.toolbar {
  flex: 0 0 40px;
  border-right: 1px solid #e4e7ed;
  font-size: 12px;

  .tool-item {
    width: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;

    .icon {
      margin-bottom: 2px;

      &.del {
        color: var(--el-color-danger);
      }
    }

    &:hover,
    &:hover .icon {
      background-color: #409eff;
      color: white;
    }

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
}
</style>
