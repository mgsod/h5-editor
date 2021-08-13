<template>
  <el-form-item label="图片地址">
    <el-input v-model="img.src"> </el-input>
  </el-form-item>
  <el-form-item label="内容适应">
    <el-select v-model="img.objectFit">
      <el-option value="cover"></el-option>
      <el-option value="contain"></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { IImg } from "@/components/RenderComponent/Img/index";

export default defineComponent({
  name: "setting",
  props: {
    componentProps: Object as PropType<IImg>,
  },
  components: {},
  setup(props, { emit }) {
    const img = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      img,
    };
  },
});
</script>

<style scoped lang="less"></style>
