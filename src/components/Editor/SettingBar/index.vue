<template>
  <div class="setting-bar">
    <tool-bar />
    <el-form label-position="left" label-width="80px" :model="componentProps">
      <el-tabs v-model="active">
        <el-tab-pane label="常规" name="prop">
          <general :component-props="componentProps" v-if="showSetting" />
        </el-tab-pane>
        <el-tab-pane label="布局" name="layout">
          <layout v-if="showSetting" :component-props="componentProps" />
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <event-bar v-if="showSetting" />
        </el-tab-pane>
        <div v-if="!showSetting" class="no-component-selected">
          请选中一个组件
        </div>
      </el-tabs>
    </el-form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, reactive } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import General from "./General.vue";
import EventBar from "./EventBar.vue";
import Layout from "@/components/Editor/SettingBar/Layout.vue";
import ToolBar from "@/components/Editor/SettingBar/ToolBar.vue";
import { ComponentType, TComponent } from "@/components/Editor/ComponentTypes";
import { getDebounceCommit, objectMerge } from "@/util";

export default defineComponent({
  name: "property",
  props: {},
  components: { General, EventBar, Layout, ToolBar },
  setup() {
    const store = useStore();
    const origin = computed(() => {
      return store.state.editor.selectedComponents;
    });
    let componentProps = reactive<Partial<TComponent>>({});
    let change = false;
    watch(origin, () => {
      change = true;
      objectMerge(origin.value || {}, componentProps);
      setTimeout(() => {
        change = false;
      });
    });
    const debounceCommit = getDebounceCommit<Partial<TComponent>>(
      store.commit,
      MUTATION_TYPE.UPDATE_COMPONENT
    );
    // 初始化执行一次合并
    objectMerge(origin.value || {}, componentProps);
    watch(componentProps, (a, b) => {
      if (!change) {
        debounceCommit(componentProps);
        change = false;
      }
      change = false;
    });

    const showSetting = computed(() => {
      return Object.keys(componentProps).length > 0;
    });

    return {
      active: "prop",
      componentProps,
      ComponentType,
      origin,
      showSetting,
    };
  },
});
</script>

<style scoped lang="less">
.setting-bar {
  box-sizing: border-box;
  width: 360px;
  height: calc(100vh - 45px);
  background: #fff;
  display: flex;
  overflow: hidden;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);

  .el-form:not(.dialog-form) {
    flex: 0 0 320px;
    overflow: hidden;

    :deep(.el-form-item) {
      margin-bottom: 15px;

      .el-form-item__label {
        font-size: 12px;
      }

      &.normal {
        .el-form-item__content > div {
          flex: none;
          width: auto;
        }
      }

      .el-form-item__content {
        display: flex;
        align-items: center;

        & > div {
          flex: 1;
          width: 0;
          margin: 0 5px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    padding: 0 8px;

    :deep(.el-tabs) {
      height: 100%;
      display: flex;
      flex-direction: column;

      .el-tabs__content {
        height: 0;
        flex: auto;

        .el-tab-pane {
          padding-bottom: 20px;
          max-height: 100%;
          overflow-y: scroll;
        }
      }
    }

    .no-component-selected {
      color: var(--el-color-info);
      margin-top: -20px;
    }
  }
}
</style>
