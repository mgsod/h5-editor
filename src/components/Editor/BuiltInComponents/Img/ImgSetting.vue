<template>
  <el-form-item label="图片地址">
    <el-input v-model="img.src"></el-input>
  </el-form-item>
  <el-form-item>
    <uploader @success="uploadSuccess" />
  </el-form-item>
  <el-form-item label="内容适应">
    <el-select v-model="img.objectFit">
      <el-option
        v-for="item in objectFitList"
        :key="item.value"
        :value="item.value"
        :label="item.name"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import {
  IImg,
  objectFitList,
} from "@/components/Editor/BuiltInComponents/Img/index";
import { ComponentSettingType } from "@/components/Editor/ComponentTypes";
import Uploader from "@/components/Editor/Uploader/Uploader.vue";

export default defineComponent({
  name: ComponentSettingType.Img,
  props: {
    componentProps: {
      type: Object as PropType<IImg>,
      required: true,
    },
  },
  components: { Uploader },
  setup(props, { emit }) {
    const img = computed<IImg>({
      get() {
        return props.componentProps;
      },
      set(val) {
        emit("update:componentProps", val);
      },
    });
    return {
      img,
      objectFitList,
      uploadSuccess(p: string) {
        img.value.src = p;
      },
    };
  },
});
</script>

<style scoped lang="less"></style>
