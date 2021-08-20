<template>
  <div class="setting-bar">
    <div class="toolbar">
      <div class="tool-item" :class="{ disabled: !allowUndo }" @click="undo">
        <div class="icon">
          <i class="el-icon-refresh-left"></i>
        </div>
        <div>撤销</div>
      </div>
      <div class="tool-item" :class="{ disabled: !allowRedo }" @click="redo">
        <div class="icon">
          <i class="el-icon-refresh-right"></i>
        </div>
        <div>重做</div>
      </div>
      <div class="tool-item" @click="del">
        <div class="icon del">
          <i class="el-icon-error"></i>
        </div>
        <div>删除</div>
      </div>
    </div>
    <el-tabs v-model="active">
      <el-tab-pane label="属性" name="prop">
        <property-bar />
      </el-tab-pane>
      <el-tab-pane label="事件" name="event"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import propertyBar from "./property-bar.vue";

export default defineComponent({
  name: "property",
  props: {},
  components: { propertyBar },
  setup() {
    const store = useStore();
    const allowUndo = computed(() => {
      return store.state.editor.allowUndo;
    });
    const allowRedo = computed(() => {
      return store.state.editor.allowRedo;
    });
    return {
      active: "prop",
      undo() {
        store.commit(MUTATION_TYPE.UNDO);
      },
      redo() {
        store.commit(MUTATION_TYPE.REDO);
      },
      del() {
        store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
      },
      allowRedo,
      allowUndo,
    };
  },
});
</script>

<style scoped lang="less">
.setting-bar {
  box-sizing: border-box;
  width: 360px;
  height: 100%;
  background: #fff;
  display: flex;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
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
  .el-tabs {
    flex: 0 0 320px;
    padding: 0 8px;
  }
}
</style>
