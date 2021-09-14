<template>
  <div v-if="Object.keys(componentProps).length > 0">
    <el-form label-position="left" label-width="80px" :model="componentProps">
      <base-setting v-model:component-props="componentProps" />
      <container-setting
        v-model:component-props="componentProps"
        v-if="componentProps.type === ComponentType.Container"
      />
      <img-setting
        v-model:componentProps="componentProps"
        v-if="componentProps.type === ComponentType.Img"
      />
      <text-setting
        v-model:component-props="componentProps"
        v-if="componentProps.type === ComponentType.Text"
      />

      <around-value
        v-model:padding="componentProps.padding"
        v-model:margin="componentProps.margin"
        v-model:border="componentProps.border"
        v-model:border-style="componentProps.borderStyle"
        v-model:border-color="componentProps.borderColor"
        v-model:top="componentProps.top"
        v-model:right="componentProps.right"
        v-model:bottom="componentProps.bottom"
        v-model:left="componentProps.left"
        :width="componentProps.width"
        :height="componentProps.height"
      />
    </el-form>
  </div>
  <div v-else class="no-component-selected">请选中一个组件</div>
</template>

<script lang="ts">
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { defineComponent, computed, watch, reactive, nextTick } from "vue";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
import { getDebounceCommit, objectMerge } from "@/util";
import ImgSetting from "@/components/Editor/RenderComponent/Img/ImgSetting.vue";
import BaseSetting from "@/components/Editor/RenderComponent/Component/BaseSetting.vue";
import ContainerSetting from "@/components/Editor/RenderComponent/Container/ContainerSetting.vue";
import TextSetting from "@/components/Editor/RenderComponent/Text/TextSetting.vue";
import AroundValue from "@/components/Editor/AroundValue/AroundValue.vue";
export default defineComponent({
  name: "property-bar",
  components: {
    ImgSetting,
    BaseSetting,
    ContainerSetting,
    AroundValue,
    TextSetting,
  },
  setup() {
    const store = useStore();
    const origin = computed(() => {
      return store.state.editor.selectedComponents;
    });
    let componentProps = reactive<Partial<TComponent>>({});
    let change = true;
    watch(origin, () => {
      change = true;
      objectMerge(origin.value || {}, componentProps);
      setTimeout(() => {
        change = false;
      });
    });
    const debounceCommit = getDebounceCommit<Partial<TComponent>>(
      store.commit,
      MUTATION_TYPE.UPDATE_COMPONENT
    );
    watch(componentProps, (a, b) => {
      if (!change) {
        debounceCommit(componentProps);
        change = false;
      }
      change = false;
    });

    return {
      componentProps,
      ComponentType,
      origin,
    };
  },
});
</script>

<style scoped lang="less">
.el-form {
  :deep(.el-form-item) {
    margin-bottom: 15px;
    .el-form-item__label {
      font-size: 12px;
    }
    .el-form-item__content {
      display: flex;
      align-items: center;
      & > div {
        flex: 1;
        width: 0;
        margin: 0 5px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
.no-component-selected {
  color: var(--el-color-info);
}
</style>
