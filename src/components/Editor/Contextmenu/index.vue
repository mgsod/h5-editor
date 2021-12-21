<template>
  <div>
    <teleport to="body">
      <div v-show="modelValue" class="contextmenu" :style="style">
        <div class="item" :class="{ disabled: isSelectRoot }" @click="del">
          删除
        </div>
        <!--        <div-->
        <!--          class="item"-->
        <!--          :class="{ disabled: isSelectRoot }"-->
        <!--          @click="closeContextmenu"-->
        <!--        >-->
        <!--          做成组件-->
        <!--        </div>-->
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive, computed } from "vue";
import useContextmenu from "@/hooks/useContextmenu";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";

export default defineComponent({
  name: "index",
  props: {
    modelValue: Boolean,
    position: {
      type: Object,
      required: true,
    },
  },
  components: {},
  setup(props) {
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
    return {
      style,
      closeContextmenu,
      isSelectRoot: computed(() => {
        return store.getters.isSelectRoot;
      }),
      del() {
        store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
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
