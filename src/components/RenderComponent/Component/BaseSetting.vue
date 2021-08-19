<template>
  <el-form-item label="别名">
    <el-input v-model="base.alias"></el-input>
  </el-form-item>
  <el-form-item label="定位">
    <el-select v-model="base.position">
      <el-option
        v-for="item in positionList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="尺寸">
    <el-input type="number" v-model.number="base.width">
      <template #prepend>宽</template>
    </el-input>
    <el-input type="number" v-model.number="base.height">
      <template #prepend>高</template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { IComponent } from "@/components/RenderComponent/Component/index";
import { ComponentSettingType } from "@/components/RenderComponent/types";
import { positionList } from "@/components/RenderComponent/Layout";

export default defineComponent({
  name: ComponentSettingType.Base,
  props: {
    componentProps: Object as PropType<IComponent>,
  },
  components: {},
  setup(props, { emit }) {
    const base = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      base,
      positionList,
    };
  },
});
</script>

<style scoped lang="less"></style>
