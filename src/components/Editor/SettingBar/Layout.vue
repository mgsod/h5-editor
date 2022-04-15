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
  <container-setting
    v-model:component-props="layout"
    v-if="componentProps.type === ComponentType.Container"
  />
  <div v-show="inFlex">
    <el-form-item label="子项填充">
      <el-select v-model="itemFillStyle">
        <el-option label="自动分配剩余空间" value="auto"></el-option>
        <el-option label="原始大小" value="none"></el-option>
        <el-option label="自定义" value="custom"></el-option>
      </el-select>
    </el-form-item>
    <div v-show="itemFillStyle === 'custom'">
      <el-form-item label="是否放大">
        <el-switch v-model="flexGrow"></el-switch>
      </el-form-item>
      <el-form-item label="是否缩小">
        <el-switch v-model="flexShrink"></el-switch>
      </el-form-item>
    </div>
  </div>

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
import { defineComponent, PropType, computed, ref, Ref, watch } from "vue";
import { positionList } from "@/components/Editor/BuiltInComponents/Layout";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import AroundValue from "@/components/Editor/AroundValue/AroundValue.vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import ContainerSetting from "@/components/Editor/BuiltInComponents/Container/ContainerSetting.vue";
import { findItemById } from "@/util";
import { useStore } from "@/store";
import { IContainer } from "@/components/Editor/BuiltInComponents/Container";

export default defineComponent({
  name: "Layout",
  props: {
    componentProps: {
      type: Object as PropType<IComponent>,
      required: true,
    },
  },
  components: {
    AroundValue,
    ContainerSetting,
  },
  setup(props, { emit }) {
    const store = useStore();
    const layout: Ref<IComponent> = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    const inFlex = computed(() => {
      if (layout.value.parentId) {
        const parent = findItemById(
          store.getters.currentPage.components,
          layout.value.parentId
        ) as IContainer;
        return parent?.display === "flex";
      }
      return false;
    });
    const flexGrow = ref(true);
    const flexShrink = ref(false);
    const itemFillStyle = computed({
      get() {
        if (layout.value.flex !== "auto" && layout.value.flex !== "none") {
          return "custom";
        }
        return layout.value.flex;
      },
      set(val: string) {
        if (val === "custom") {
          layout.value.flex = `${flexGrow.value ? "1" : "0"} ${
            flexShrink.value ? "1" : "0"
          } auto`;
        } else {
          layout.value.flex = val;
        }
      },
    });
    watch([flexShrink, flexGrow], () => {
      layout.value.flex = `${flexGrow.value ? "1" : "0"} ${
        flexShrink.value ? "1" : "0"
      } auto`;
    });
    return {
      layout,
      positionList,
      ComponentType,
      itemFillStyle,
      flexGrow,
      flexShrink,
      inFlex,
    };
  },
});
</script>
