<template>
  <el-form-item label="标签管理">
    <el-button @click="add" type="primary" size="mini">添加新标签</el-button>
  </el-form-item>
  <div class="tab-list hidden-scrollbar">
    <div class="item" v-for="(item, index) in tab.children" :key="item.id">
      <input class="tab-name-input" type="text" v-model="item.alias" />
      <el-popconfirm
        confirmButtonText="确定"
        cancelButtonText="取消"
        icon="el-icon-info"
        iconColor="red"
        title="确认删除此tab页吗？"
        @confirm="remove(index)"
      >
        <template #reference>
          <el-icons name="CircleClose" />
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import {
  getNewTabContainer,
  ITab,
} from "@/components/Editor/TrilateralComponents/Vant/Tab/index";

export default defineComponent({
  name: "TabSetting",
  props: {
    componentProps: Object as PropType<ITab>,
  },
  setup(props, { emit }) {
    const tab = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      tab,
      add() {
        (tab.value as ITab).children.push(getNewTabContainer());
      },
      remove(index: number) {
        (tab.value as ITab).children.splice(index, 1);
      },
    };
  },
});
</script>

<style scoped lang="less">
.tab-list {
  display: flex;
  overflow: scroll;

  .item {
    flex-shrink: 0;
    border: 1px solid var(--el-color-primary);
    margin: 0 -1px 0 0;
    cursor: default;
    position: relative;

    .tab-name-input {
      padding: 8px 15px;
      border: none;
      outline: none;
      max-width: 100px;
    }

    i {
      position: absolute;
      top: 0;
      right: 0;
      color: var(--el-color-danger);
      display: none;
      cursor: pointer;
    }

    &:hover {
      i {
        display: block;
      }
    }
  }
}
</style>
