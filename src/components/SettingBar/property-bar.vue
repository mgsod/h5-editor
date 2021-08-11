<template>
  <div v-if="Object.keys(componentProps).length > 0">
    <el-form label-position="left" label-width="8" :model="componentProps">
      <el-form-item label="尺寸" class="flex">
        <el-input type="number" v-model.number="componentProps.width">
          <template #prepend>宽</template>
        </el-input>
        <el-input type="number" v-model.number="componentProps.height">
          <template #prepend>高</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
  <template v-else> 请选中一个组件 </template>
</template>

<script lang="ts">
import { defineComponent, computed, watch, reactive } from "vue";
import { TComponent } from "@/components/RenderComponent/types";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/mudules/editor/mutation-type";
import { getDebounceCommit, objectMerge } from "@/util";
export default defineComponent({
  name: "property-bar",
  components: {},
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
          margin: 0 5px;
          width: 0;
        }
      }
    }
  }
}
</style>
