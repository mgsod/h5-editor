<template>
  <div class="toolbar">
    <div class="tool-item" :class="{ disabled: !allowUndo }" @click="undo">
      <div class="icon">
        <i class="el-icon-refresh-left"></i>
      </div>
      <div>撤销</div>
    </div>
    <div class="tool-item" :class="{ disabled: !allowRedo }" @click="redo">
      <div class="icon">
        <i class="el-icon-refresh-right"></i>
      </div>
      <div>重做</div>
    </div>
    <div class="tool-item" :class="{ disabled: !hasSelected }" @click="del">
      <div class="icon del">
        <i class="el-icon-error"></i>
      </div>
      <div>删除</div>
    </div>
    <div class="tool-item" @click="preview">
      <div class="icon">
        <i class="el-icon-view" />
      </div>
      <div>预览</div>
    </div>
  </div>
  <el-dialog v-model="showDialog" top="3vh" width="600px" :lock-scroll="true">
    <div class="previewer-box">
      <div class="iPhoneX-StatusBar">
        <div class="StatusBarTime">{{ time }}</div>
        <div class="StatusBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12">
            <path
              d="M1.25 6.5h1a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1zM5.75 5h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4.5-2h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4.5-2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="StatusBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12">
            <path
              d="M8.007 2.787a8.64 8.64 0 0 1 5.953 2.379c.12.118.314.116.433-.004l1.156-1.166a.322.322 0 0 0-.003-.456 10.897 10.897 0 0 0-15.08 0 .322.322 0 0 0-.003.456L1.62 5.162c.119.12.312.122.433.004a8.641 8.641 0 0 1 5.954-2.379zm0 3.796c1.217 0 2.391.452 3.294 1.27a.31.31 0 0 0 .433-.006l1.155-1.167a.322.322 0 0 0-.005-.459 7.16 7.16 0 0 0-9.752 0 .322.322 0 0 0-.005.46l1.155 1.166a.31.31 0 0 0 .433.006 4.907 4.907 0 0 1 3.292-1.27zm2.219 2.784a.314.314 0 0 0-.01-.457 3.422 3.422 0 0 0-4.42 0 .314.314 0 0 0-.009.457l1.998 2.016a.312.312 0 0 0 .443 0l1.998-2.016z"
              fill-rule="nonzero"
            ></path>
          </svg>
        </div>
        <div class="StatusBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="12">
            <path
              d="M2.667 1.333C1.747 1.333 1 2.08 1 3v6c0 .92.746 1.667 1.667 1.667h16.666C20.253 10.667 21 9.92 21 9V3c0-.92-.746-1.667-1.667-1.667H2.667zm0-1h16.666A2.667 2.667 0 0 1 22 3v6a2.667 2.667 0 0 1-2.667 2.667H2.667A2.667 2.667 0 0 1 0 9V3A2.667 2.667 0 0 1 2.667.333z"
              opacity=".35"
            ></path>
            <path d="M23 4v4a2.17 2.17 0 0 0 0-4" opacity=".4"></path>
            <rect x="2" y="2.333" width="18" height="7.333" rx="1.333"></rect>
          </svg>
        </div>
      </div>
      <previewer :rem="false" :components="components" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
import useDialog from "@/hooks/useDialog";
import Previewer from "@/components/Previewer/index.vue";

export default defineComponent({
  name: "ToolBar",
  props: {},
  components: { Previewer },
  setup() {
    const store = useStore();
    const { showDialog } = useDialog();
    const allowUndo = computed(() => {
      return store.state.editor.allowUndo;
    });
    const allowRedo = computed(() => {
      return store.state.editor.allowRedo;
    });

    const time = ref("");
    const getTime = () => {
      const dateNow = new Date();
      time.value = `${dateNow.getHours().toString().padStart(2, "0")}:${dateNow
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    };
    getTime();
    setInterval(() => {
      getTime();
    }, 1000 * 60);
    return {
      time,
      allowUndo,
      allowRedo,
      showDialog,
      components: computed(() => {
        return store.getters.currentPage.components;
      }),
      hasSelected: computed(() => {
        const selected = store.state.editor.selectedComponents;
        if (!selected) return false;
        return selected.id !== "root";
      }),
      preview() {
        showDialog.value = true;
      },
      undo() {
        store.commit(MUTATION_TYPE.UNDO);
      },
      redo() {
        store.commit(MUTATION_TYPE.REDO);
      },
      del() {
        store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
      },
    };
  },
});
</script>
<style scoped lang="less">
.toolbar {
  flex: 0 0 40px;
  border-right: 1px solid #e4e7ed;
  font-size: 12px;
  .tool-item {
    width: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;
    .icon {
      margin-bottom: 2px;
      &.del {
        color: var(--el-color-danger);
      }
    }
    &:hover,
    &:hover .icon {
      background-color: #409eff;
      color: white;
    }
    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
}
.previewer-box {
  position: relative;
  top: -150px;
  transform: scale(0.7);
  width: 435px;
  height: 864px;
  margin: 0 auto;
  overflow: auto;
  box-sizing: content-box !important;
  background-image: url("../../../assets/img/phone.png");
  background-size: cover;
  .iPhoneX-StatusBar {
    width: 375px;
    height: 44px;
    display: flex;
    justify-content: center;
    padding: 0 14px;
    margin-left: 30px;
    margin-top: 26px;
    align-items: center;
    .StatusBarTime {
      justify-content: center;
      margin-right: auto;
      margin-left: 7px;
      width: 54px;
      font-size: 14px;
      font-weight: 600;
    }
    .StatusBar {
      margin-left: 4px;
    }
  }
  .dom-render {
    margin-left: 30px;
    height: calc(100% - 97px);
  }
}
</style>
