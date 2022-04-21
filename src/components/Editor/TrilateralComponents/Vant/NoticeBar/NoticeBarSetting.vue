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
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import {
  INoticeBar,
  NoticeBarModeList,
} from "@/components/Editor/TrilateralComponents/Vant/NoticeBar/index";

export default defineComponent({
  name: "NoticeBarSetting",
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
        emit("update:componentProps", val);
      },
    });
    return {
      NoticeBarModeList,
      noticeBar,
    };
  },
});
</script>

<style scoped lang="less"></style>
