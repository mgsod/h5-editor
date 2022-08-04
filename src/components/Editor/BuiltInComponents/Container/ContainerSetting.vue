<template>
  <el-form-item label="布局方式">
    <el-select v-model="container.display">
      <el-option
        v-for="item in displayList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
  <!--flex布局下才有的设置-->
  <template v-if="container.display === DISPLAY.FLEX">
    <el-form-item label="布局方向">
      <el-select v-model="container.direction">
        <el-option
          v-for="item in FlexDirectionList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主轴对齐">
      <el-select v-model="container.JustifyContent">
        <el-option
          v-for="item in JustifyContentList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="交叉轴对齐">
      <el-select v-model="container.AlignItems">
        <el-option
          v-for="item in AlignItemsList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { ComponentSettingType } from '@/components/Editor/ComponentTypes';
import {
  DISPLAY,
  displayList,
  IContainer,
  JustifyContentList,
  AlignItemsList,
  FlexDirectionList,
} from '@/components/Editor/BuiltInComponents/Container/index';

export default defineComponent({
  name: ComponentSettingType.Container,
  props: {
    componentProps: Object as PropType<IContainer>,
  },
  components: {},
  setup(props) {
    const container = computed(() => {
      return props.componentProps;
    });
    return {
      DISPLAY,
      displayList,
      container,
      FlexDirectionList,
      JustifyContentList,
      AlignItemsList,
    };
  },
});
</script>

<style scoped lang="less"></style>
