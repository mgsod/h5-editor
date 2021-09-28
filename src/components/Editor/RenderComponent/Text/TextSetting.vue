<template>
  <el-form-item label="文本内容" v-if="hasProperty('text')">
    <el-input type="textarea" v-model="text.text" />
  </el-form-item>
  <el-form-item label="字体" v-if="hasProperty('fontFamily')"></el-form-item>
  <el-form-item label="字体颜色" v-if="hasProperty('color')">
    <el-color-picker v-model="text.color" show-alpha></el-color-picker>
  </el-form-item>
  <el-form-item label="字体大小" v-if="hasProperty('fontSize')">
    <el-input type="number" v-model.number="text.fontSize">
      <template #append>px</template>
    </el-input>
  </el-form-item>
  <el-form-item label="行高" v-if="hasProperty('lineHeight')">
    <el-input type="number" v-model="text.lineHeight">
      <template #append>px</template>
    </el-input>
  </el-form-item>
  <el-form-item label="字重" v-if="hasProperty('fontWeight')">
    <el-select v-model="text.fontWeight">
      <el-option
        v-for="item in fontWeightList"
        :key="item"
        :value="item.value"
        :label="item.name"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="字体样式" v-if="hasProperty('fontStyle')">
    <el-select v-model="text.fontStyle">
      <el-option value="normal" label="常规"></el-option>
      <el-option value="italic" label="斜体"></el-option>
      <el-option value="inherit" label="继承父级"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="文本对齐" v-if="hasProperty('textAlign')">
    <el-select v-model="text.textAlign">
      <el-option value="left" label="左对齐"></el-option>
      <el-option value="center" label="居中对齐"></el-option>
      <el-option value="right" label="右对齐"></el-option>
      <el-option value="inherit" label="继承父级"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="溢出省略" v-if="hasProperty('overflow')">
    <el-switch v-model="text.overflow"> </el-switch>
  </el-form-item>
  <el-form-item
    label="最大行数"
    v-show="text.overflow"
    v-if="hasProperty('maxLines')"
  >
    <el-input-number
      :min="1"
      :max="5"
      controls-position="right"
      v-model="text.maxLines"
    >
    </el-input-number>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from "vue";
import { IText } from "@/components/Editor/RenderComponent/Text/index";

export default defineComponent({
  name: "TextSetting",
  props: {
    componentProps: Object as PropType<IText>,
  },
  components: {},
  setup(props, { emit }) {
    onMounted(() => {
      console.log(1);
    });
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
      { name: "细", value: "lighter" },
      { name: "继承父级", value: "inherit" }
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
      hasProperty(property: string) {
        return Object.prototype.hasOwnProperty.call(
          props.componentProps,
          property
        );
      },
    };
  },
});
</script>

<style scoped lang="less"></style>
