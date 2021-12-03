<template>
  <el-form-item label="别名">
    <el-input v-model="base.alias"></el-input>
  </el-form-item>
  <el-form-item label="背景">
    <el-color-picker
      show-alpha
      v-model="base.background.color"
    ></el-color-picker>
  </el-form-item>
  <container-setting
    v-model:component-props="base"
    v-if="componentProps.type === ComponentType.Container"
  />
  <img-setting
    v-model:componentProps="base"
    v-if="componentProps.type === ComponentType.Img"
  />
  <text-setting v-model:component-props="base" :key="base.id" />
  <tab-setting
    v-model:componentProps="base"
    v-if="componentProps.type === ComponentType.Tab"
  />
</template>

<script lang="ts">
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { defineComponent, computed, PropType } from "vue";
import ImgSetting from "@/components/Editor/RenderComponent/Img/ImgSetting.vue";
import ContainerSetting from "@/components/Editor/RenderComponent/Container/ContainerSetting.vue";
import TextSetting from "@/components/Editor/RenderComponent/Text/TextSetting.vue";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import TabSetting from "@/components/Editor/RenderComponent/Tab/TabSetting.vue";
export default defineComponent({
  name: "property-bar",
  props: {
    componentProps: Object as PropType<IComponent>,
  },
  components: {
    ImgSetting,
    ContainerSetting,
    TextSetting,
    TabSetting,
  },
  setup(props) {
    const base = computed(() => {
      return props.componentProps;
    });
    return {
      base,
      ComponentType,
    };
  },
});
</script>
