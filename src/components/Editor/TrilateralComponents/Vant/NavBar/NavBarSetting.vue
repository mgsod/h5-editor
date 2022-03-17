<template>
  <el-form-item label="标题设置">
    <el-input v-model="navbar.title" />
  </el-form-item>
  <el-form-item label="展示返回">
    <el-switch v-model="navbar.showBack" />
  </el-form-item>
  <el-form-item label="显示分割线">
    <el-switch v-model="navbar.showBottomLine" />
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { INavBar } from "@/components/Editor/TrilateralComponents/Vant/NavBar/index";

export default defineComponent({
  name: "NavBarSetting",
  props: {
    componentProps: {
      type: Object as PropType<INavBar>,
      required: true,
    },
  },
  components: {},
  setup(props, { emit }) {
    const navbar = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      navbar,
    };
  },
});
</script>

<style scoped lang="less"></style>
