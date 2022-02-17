<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component/index";
import { ComponentSettingType } from "@/components/Editor/BuiltInComponents/types";
import { positionList } from "@/components/Editor/BuiltInComponents/Layout";
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
