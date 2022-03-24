<template>
  <el-dialog
    :destroy-on-close="true"
    v-model="showDialog"
    top="3vh"
    width="600px"
    :lock-scroll="true"
  >
    <div class="content">
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
        <previewer
          :rem="false"
          :pages="pages"
          ref="previewer"
          v-model:home-page-id="currentRouterId"
        />
        <div class="screen-footer" style="height: 34px">
          <div class="footer-widgets"></div>
        </div>
      </div>
      <div class="pager">
        <div class="pointer">
          <span
            class="pointer-item"
            v-for="item in pages"
            :key="item.id"
            :class="{ active: item.id === currentRouterId }"
          ></span>
        </div>
        <div class="arrow">
          <div class="prev" title="上一页" @click="pageHandle('prev')">
            <el-icons name="arrowUpBold" />
          </div>
          <div class="next" title="下一页" @click="pageHandle('next')">
            <el-icons name="arrowDownBold" />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import Previewer from "@/components/Previewer/index.vue";

export default defineComponent({
  name: "previewDialog",
  props: {
    pages: Array,
    homePage: String,
    modelValue: Boolean,
  },
  components: { Previewer },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const currentRouterId = ref("");
    const { modelValue } = toRefs(props);
    const showDialog = ref(false);
    watch(modelValue, (v) => {
      showDialog.value = v;
    });
    watch(showDialog, (v) => {
      emit("update:modelValue", v);
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
    const previewer = ref();
    return {
      time,
      previewer,
      pageHandle(flag: string) {
        previewer.value.setPath(flag);
      },
      showDialog,
      currentRouterId,
    };
  },
});
</script>

<style scoped lang="less">
.content {
  display: flex;
  user-select: none;

  .previewer-box {
    position: relative;
    top: -150px;
    transform: scale(0.7);
    width: 435px;
    height: 864px;
    overflow: auto;
    box-sizing: content-box !important;
    background-image: url("../../assets/img/phone.png");
    background-size: cover;

    .iPhoneX-StatusBar {
      width: 375px;
      height: 44px;
      display: flex;
      justify-content: center;
      padding: 0 14px;
      margin-left: 30px;
      margin-top: 28px;
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
      height: calc(100% - 140px);
      :deep(.h-container) {
        overflow: auto;
      }
    }

    .screen-footer {
      display: flex;
      align-items: center;

      .footer-widgets {
        width: 134px;
        height: 5px;
        background-color: rgb(0, 0, 0);
        border-style: none;
        border-color: unset;
        border-radius: 3px;
        font-size: 14px;
        padding: 0px;
        text-align: center;
        line-height: 20px;
        font-weight: normal;
        font-style: normal;
        margin: 0 auto;
      }
    }
  }

  .pager {
    height: 604px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: relative;
    top: -20px;

    .pointer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-item {
        width: 10px;
        height: 10px;
        display: inline-block;
        border: 1px solid var(--el-border-color-light);
        border-radius: 50%;
        margin-bottom: 10px;
        transition: all 0.3s;

        &.active {
          transform: scale(1.1);
          background: var(--el-color-primary);
          border-color: var(--el-color-primary-light-1);
        }
      }
    }

    .arrow {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 15px;

      .prev,
      .next {
        height: 35px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
