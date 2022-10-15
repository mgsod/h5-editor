<template>
  <el-form-item label="通知栏模式">
    <el-select v-model="noticeBar.mode">
      <el-option
        v-for="item in NoticeBarModeList"
        :key="item.value"
        :value="item.value"
        :label="item.name"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="垂直滚动">
    <el-switch v-model="noticeBar.vertical"></el-switch>
  </el-form-item>
  <div v-show="noticeBar.vertical">
    <el-form-item label="播放速速">
      <el-input v-model="noticeBar.speed">
        <template #append>ms</template>
      </el-input>
    </el-form-item>
    <el-form-item label="滚动列表" class="vertical-list">
      <div>
        <el-button
          type="primary"
          size="small"
          @click="noticeBar.multiple.push('')"
          >新增一行
        </el-button>
      </div>
      <div v-for="(item, index) in noticeBar.multiple" :key="index">
        <el-input v-model="noticeBar.multiple[index]">
          <template #append>
            <el-button @click="remove(index)" :icon="Minus" />
          </template>
        </el-input>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Minus } from '@element-plus/icons-vue';
import { defineComponent, PropType, computed } from 'vue';
import {
  INoticeBar,
  NoticeBarModeList,
} from '@/components/Editor/TrilateralComponents/Vant/NoticeBar/index';

export default defineComponent({
  name: 'NoticeBarSetting',
  props: {
    componentProps: {
      type: Object as PropType<INoticeBar>,
      required: true,
    },
  },
  components: {},
  setup(props, { emit }) {
    const noticeBar = computed<INoticeBar>({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit('update:componentProps', val);
      },
    });
    return {
      NoticeBarModeList,
      noticeBar,
      Minus,
      remove(index: number) {
        noticeBar.value.multiple?.splice(index, 1);
      },
    };
  },
});
</script>

<style scoped lang="less">
.vertical-list {
  ::v-deep(.el-form-item__content) {
    flex-direction: column !important;

    & > div {
      width: 100% !important;
      margin: 5px 0 0 !important;

      .el-input-group__append {
        cursor: pointer;
      }
    }
  }
}
</style>
