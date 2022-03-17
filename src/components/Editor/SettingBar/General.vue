<template>
  <el-form-item label="别名">
    <el-input v-model="base.alias"></el-input>
  </el-form-item>
  <el-form-item label="背景" class="normal">
    <el-color-picker
      show-alpha
      v-model="base.background.color"
    ></el-color-picker>
  </el-form-item>
  <el-form-item label="背景图片">
    <el-input v-model="base.background.url">
      <template #append>
        <el-button
          :icon="arrow"
          @click="expandBgSetting = !expandBgSetting"
        ></el-button>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <uploader @success="uploadSuccess" />
  </el-form-item>

  <el-collapse-transition>
    <div v-show="expandBgSetting">
      <el-form-item label="重复填充">
        <el-select v-model="base.background.repeat" placeholder="请选择">
          <el-option label="不重复" value="no-repeat" />
          <el-option label="重复" value="repeat" />
          <el-option label="横向重复" value="repeat-x" />
          <el-option label="纵向重复" value="repeat-y" />
          <el-option label="重复,完整填充" value="space" />
          <el-option label="重复,填满" value="round" />
        </el-select>
      </el-form-item>
      <el-form-item label="填充尺寸">
        <el-select v-model="base.background.size" placeholder="请选择">
          <el-option label="原始大小" value="auto" />
          <el-option label="包含" value="contain" />
          <el-option label="覆盖" value="cover" />
          <el-option label="拉伸" value="100% 100%" />
        </el-select>
      </el-form-item>
      <el-form-item label="水平对齐">
        <el-select v-model="base.background.horizontal" placeholder="请选择">
          <el-option label="居中" value="center" />
          <el-option label="左对齐" value="left" />
          <el-option label="右对齐" value="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="垂直对齐">
        <el-select v-model="base.background.vertical" placeholder="请选择">
          <el-option label="居中" value="center" />
          <el-option label="顶部" value="top" />
          <el-option label="底部" value="bottom" />
        </el-select>
      </el-form-item>
    </div>
  </el-collapse-transition>

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
    v-if="
      [ComponentType.Tab, ComponentType.Swiper].includes(componentProps.type)
    "
  />
</template>

<script lang="ts">
import { ArrowDownBold, ArrowUpBold } from "@element-plus/icons-vue";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { defineComponent, computed, PropType, ref } from "vue";
import ImgSetting from "@/components/Editor/BuiltInComponents/Img/ImgSetting.vue";
import ContainerSetting from "@/components/Editor/BuiltInComponents/Container/ContainerSetting.vue";
import TextSetting from "@/components/Editor/BuiltInComponents/Text/TextSetting.vue";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import TabSetting from "@/components/Editor/TrilateralComponents/Vant/Tab/TabSetting.vue";
import Uploader from "@/components/Editor/Uploader/Uploader.vue";

export default defineComponent({
  name: "property-bar",
  props: {
    componentProps: {
      type: Object as PropType<IComponent>,
      required: true,
    },
  },
  components: {
    ImgSetting,
    ContainerSetting,
    TextSetting,
    TabSetting,
    Uploader,
  },
  setup(props) {
    const base = computed(() => {
      return props.componentProps;
    });
    const expandBgSetting = ref(false);
    const arrow = computed(() => {
      return expandBgSetting.value ? ArrowUpBold : ArrowDownBold;
    });
    return {
      arrow,
      base,
      ComponentType,
      expandBgSetting,
      uploadSuccess(p: string) {
        base.value.background.url = p;
      },
    };
  },
});
</script>
<style>
.el-upload {
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
