<template>
  <el-form-item label="文本内容">
    <el-input type="textarea" v-model="text.text" />
  </el-form-item>
  <el-form-item label="字体"></el-form-item>
  <el-form-item label="字体颜色">
    <el-color-picker v-model="text.color" show-alpha></el-color-picker>
  </el-form-item>
  <el-form-item label="字体大小">
    <el-input-number
      :min="12"
      :max="28"
      controls-position="right"
      v-model="text.fontSie"
    >
    </el-input-number>
  </el-form-item>
  <el-form-item label="字重">
    <el-select v-model="text.fontWeight">
      <el-option
        v-for="item in fontWeightList"
        :key="item"
        :value="item.value"
        :label="item.name"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="字体样式">
    <el-select v-model="text.fontStyle">
      <el-option value="normal" label="常规"></el-option>
      <el-option value="italic" label="斜体"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="文本对齐">
    <el-select v-model="text.textAlign">
      <el-option value="left" label="左对齐"></el-option>
      <el-option value="center" label="居中对齐"></el-option>
      <el-option value="right" label="右对齐"></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from "vue";
import { IText } from "@/components/RenderComponent/Text/index";

export default defineComponent({
  name: "TextSetting",
  props: {
    componentProps: Object as PropType<IText>,
  },
  components: {},
  setup(props, { emit }) {
    let fontWeightList = new Array(9).fill("").map((item, index) => {
      const value = ((index + 1) * 100).toString();
      return {
        name: value,
        value,
      };
    });

    fontWeightList.push(
      { name: "常规", value: "normal" },
      { name: "粗体", value: "bold" },
      { name: "加粗", value: "bolder" },
      { name: "细", value: "lighter" }
    );
    const text = computed({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      text,
      fontWeightList,
    };
  },
});
</script>

<style scoped lang="less"></style>
