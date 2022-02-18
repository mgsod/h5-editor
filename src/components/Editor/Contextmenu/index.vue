<template>
  <div>
    <teleport to="body">
      <div v-show="modelValue" class="contextmenu" :style="style">
        <div class="item" :class="{ disabled: isRoot }" @click="del">
          <div class="left">
            <el-icons name="Delete" />
            <span class="name">删除</span>
          </div>
        </div>
        <div class="item" :class="{ disabled: isRoot }" @click="extract">
          <div class="left">
            <el-icons name="Coin" />
            <span class="name">做成组件</span>
          </div>
        </div>
        <div
          class="item"
          @click="lock"
          :class="{ disabled: isLock || isRoot || !isContainer }"
        >
          <div class="left">
            <el-icons name="Lock" />
            <span class="name">锁定 </span>
          </div>
        </div>
        <div
          class="item"
          @click="unlock"
          :class="{ disabled: !isLock || isRoot || !isContainer }"
        >
          <div class="left">
            <el-icons name="Unlock" />
            <span class="name">解除锁定</span>
          </div>
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
import { TComponent } from "@/components/Editor/ComponentTypes";
import { cloneDeep } from "lodash";
import { eachComponentTreeDown } from "@/util";

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
    const isContainer = computed(() => {
      return !!contextmenuComponent.value?.isContainer;
    });
    const isLock = computed(() => {
      if (!isContainer.value) return true;
      // 如果一个容器，容器内有一个元素是lock。即表示这个容器是lock的
      return !!contextmenuComponent.value?.children[0].lock;
    });

    function afterCloseContextmenu(action: () => void) {
      action();
      closeContextmenu();
    }

    return {
      isContainer,
      isLock,
      style,
      isRoot,
      del() {
        afterCloseContextmenu(() => {
          store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
        });
      },
      extract() {
        afterCloseContextmenu(() => {
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
        });
      },
      lock() {
        afterCloseContextmenu(() => {
          const current = cloneDeep(contextmenuComponent.value as TComponent);
          eachComponentTreeDown(
            current,
            (item) => {
              item.lock = true;
            },
            (item) => {
              return item.id !== current.id;
            }
          );
          store.commit(MUTATION_TYPE.UPDATE_COMPONENT, current);
        });
      },
      unlock() {
        afterCloseContextmenu(() => {
          const current = cloneDeep(contextmenuComponent.value as TComponent);
          eachComponentTreeDown(current, (item) => {
            item.lock = false;
          });
          store.commit(MUTATION_TYPE.UPDATE_COMPONENT, current);
        });
      },
    };
  },
});
</script>

<style scoped lang="less">
.contextmenu {
  position: absolute;
  z-index: 2001;
  background: #fff;
  width: 180px;
  color: #02102e;
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  font-size: 12px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  padding: 5px 0;
  .item {
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .name {
        display: inline-block;
      }
    }

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
      color: var(--el-text-color-disabled-base);
    }

    i {
      margin-right: 5px;
    }

    &:hover {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary-light-2);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }
}
</style>
