<template>
  <div>
    <teleport to="body">
      <div v-show="modelValue" class="contextmenu" :style="style">
        <div class="item" :class="{ disabled: isRoot }" @click="del">删除</div>
        <div class="item" :class="{ disabled: isRoot }" @click="extract">
          做成组件
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  reactive,
  computed,
  PropType,
  toRefs,
} from "vue";
import useContextmenu from "@/hooks/useContextmenu";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import { ElMessageBox } from "element-plus";
import { TComponent } from "@/components/Editor/RenderComponent/types";
import { cloneDeep } from "lodash";
export default defineComponent({
  name: "index",
  props: {
    modelValue: Boolean,
    position: {
      type: Object,
      required: true,
    },
    component: {
      type: Object as PropType<TComponent>,
    },
  },
  setup(props) {
    const { component: contextmenuComponent } = toRefs(props);
    const store = useStore();
    const { closeContextmenu } = useContextmenu();
    const style = reactive({
      left: props.position.y + "px",
      top: props.position.y + "px",
    });
    watch(props.position, () => {
      style.left = props.position.x + "px";
      style.top = props.position.y + "px";
    });
    const isRoot = computed(() => {
      return contextmenuComponent.value?.id === "root";
    });
    return {
      style,
      closeContextmenu,
      isRoot,
      isSelectRoot: computed(() => {
        return store.getters.isSelectRoot;
      }),
      hasSelected: computed(() => {
        return !!store.state.editor.selectedComponents;
      }),
      del() {
        store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
        closeContextmenu();
      },
      extract() {
        ElMessageBox.prompt("请输入组件名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue:
            contextmenuComponent.value?.alias ||
            contextmenuComponent.value?.type,
          inputValidator(v) {
            if (!v) return "请输入组件名称";
            return true;
          },
        }).then(({ value }) => {
          store.commit(MUTATION_TYPE.EXTRACT_COMPONENT, {
            name: value,
            component: cloneDeep(contextmenuComponent.value),
          });
        });
        closeContextmenu();
      },
    };
  },
});
</script>

<style scoped lang="less">
.contextmenu {
  position: absolute;
  z-index: 2001;
  border: 1px solid var(--el-border-color-base);
  background: white;

  .item {
    padding: 8px 15px;
    cursor: default;
    min-width: 150px;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:hover {
      background: var(--el-color-info-lighter);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--el-border-color-base);
    }
  }
}
</style>
