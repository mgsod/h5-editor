<template>
  <div v-if="Object.keys(componentProps).length > 0">
    <el-form label-position="left" label-width="75px" :model="componentProps">
      <el-form-item label="尺寸" class="flex">
        <el-input type="number" v-model.number="componentProps.width">
          <template #prepend>宽</template>
        </el-input>
        <el-input type="number" v-model.number="componentProps.height">
          <template #prepend>高</template>
        </el-input>
      </el-form-item>
      <img-setting
        v-model:componentProps="componentProps"
        v-if="componentProps.type === 'Img'"
      />
    </el-form>
  </div>
  <div v-else class="no-component-selected">请选中一个组件</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, reactive, nextTick } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import { getDebounceCommit, objectMerge } from "@/util";
import ImgSetting from "@/components/RenderComponent/Img/setting.vue";
export default defineComponent({
  name: "property-bar",
  components: { ImgSetting },
  setup() {
    const store = useStore();
    const origin = computed(() => {
      return store.state.editor.selectedComponents;
    });
    let componentProps = reactive<Partial<TComponent>>({});
    let change = true;
    watch(
      origin,
      () => {
        change = true;
        objectMerge(origin.value || {}, componentProps);
        change = false;
      },
      { deep: true }
    );
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
    };
  },
});
</script>

<style scoped lang="less">
.el-form {
  .el-form-item {
    &.flex {
      /deep/.el-form-item__content {
        display: flex;
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
}
.no-component-selected {
  color: var(--el-color-info);
}
</style>
