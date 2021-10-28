<template>
  <el-form-item label="尺寸">
    <el-input
      type="number"
      v-model.number="layout.width"
      :disabled="layout.id === 'root'"
    >
      <template #prepend>宽</template>
    </el-input>
    <el-input
      type="number"
      v-model.number="layout.height"
      :disabled="layout.id === 'root'"
    >
      <template #prepend>高</template>
    </el-input>
  </el-form-item>
  <el-form-item label="定位">
    <el-select v-model="layout.position" :disabled="layout.id === 'root'">
      <el-option
        v-for="item in positionList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
  <around-value
    v-model:padding="layout.padding"
    v-model:margin="layout.margin"
    v-model:border="layout.border"
    v-model:border-style="layout.borderStyle"
    v-model:border-color="layout.borderColor"
    v-model:top="layout.top"
    v-model:right="layout.right"
    v-model:bottom="layout.bottom"
    v-model:left="layout.left"
    v-model:border-radius="layout.borderRadius"
    :width="componentProps.width"
    :height="componentProps.height"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { positionList } from "@/components/Editor/RenderComponent/Layout";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import AroundValue from "@/components/Editor/AroundValue/AroundValue.vue";

export default defineComponent({
  name: "Layout",
  props: {
    componentProps: Object as PropType<IComponent>,
  },
  components: {
    AroundValue,
  },
  setup(props, { emit }) {
    const layout = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      layout,
      positionList,
    };
  },
});
</script>

<style scoped lang="less"></style>
