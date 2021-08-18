<template>
  <el-form-item label="布局方式">
    <el-select v-model="container.display">
      <el-option
        v-for="item in layoutType"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { ComponentSettingType } from "@/components/RenderComponent/types";
import { layoutType } from "@/components/RenderComponent/Layout";
import { IContainer } from "@/components/RenderComponent/Container/index";

export default defineComponent({
  name: ComponentSettingType.Container,
  props: {
    componentProps: Object as PropType<IContainer>,
  },
  components: {},
  setup(props, { emit }) {
    const container = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      layoutType,
      container,
    };
  },
});
</script>

<style scoped lang="less"></style>
