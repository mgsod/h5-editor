<template>
  <el-form-item :label="`${name}管理`">
    <el-button @click="add" type="primary" size="small">新增一页</el-button>
  </el-form-item>
  <div class="tab-list hidden-scrollbar">
    <div
      class="item"
      :class="{ active: componentProps.active === index }"
      v-for="(item, index) in componentProps.children"
      :key="item.id"
      @click="selectTab(index)"
    >
      <input class="tab-name-input" type="text" v-model="item.alias" />
      <el-popconfirm
        confirmButtonText="确定"
        cancelButtonText="取消"
        icon="el-icon-info"
        iconColor="red"
        :title="`确认删除此${name}页吗？`"
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
import { computed, defineComponent, PropType, toRefs } from 'vue';
import {
  getNewTabContainer,
  ITab,
} from '@/components/Editor/TrilateralComponents/Vant/Tab/index';
import { ComponentType } from '@/components/Editor/ComponentTypes';

export default defineComponent({
  name: 'TabSetting',
  props: {
    componentProps: {
      type: Object as PropType<ITab>,
      required: true,
    },
  },
  setup(props) {
    const { componentProps } = toRefs(props);
    const selectTab = (index: number) => {
      componentProps.value.active = index;
    };
    const name = computed(() => {
      return componentProps.value.type === ComponentType.Swiper
        ? '轮播'
        : 'tab';
    });
    return {
      add() {
        componentProps.value.children.push(
          getNewTabContainer(`新${name.value}页`)
        );
      },
      remove(index: number) {
        componentProps.value.children.splice(index, 1);
      },
      selectTab,
      name,
    };
  },
});
</script>

<style scoped lang="less">
.tab-list {
  display: flex;
  overflow: scroll;

  .item {
    position: relative;
    flex-shrink: 0;
    margin: 0 -1px 0 0;
    cursor: default;
    border: 1px solid var(--el-color-primary);

    &.active {
      color: #fff;
      background: var(--el-color-primary);
    }

    .tab-name-input {
      max-width: 100px;
      padding: 8px 15px;
      background: transparent;
      border: none;
      outline: none;
    }

    i {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      color: var(--el-color-danger);
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
