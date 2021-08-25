<template>
  <el-form-item label="模型">
    <div class="around">
      <div class="computed">
        <div class="position" @click="selectedArea($event, 'position')">
          <span class="tip">定位</span>
          <span
            class="value"
            v-for="item in position"
            :key="`position_${item}`"
            :class="item"
          >
            {{ defaultValue($props[item]) }}</span
          >
          <div class="margin" @click="selectedArea($event, 'margin')">
            <span class="tip">外边距</span>
            <span
              class="value"
              v-for="item in position"
              :key="`position_${item}`"
              :class="item"
            >
              {{ defaultValue($props.margin ? $props.margin[item] : "") }}</span
            >
            <div class="border" @click="selectedArea($event, 'border')">
              <span class="tip">边框</span>
              <span
                class="value"
                v-for="item in position"
                :key="`position_${item}`"
                :class="item"
              >
                {{
                  defaultValue($props.border ? $props.border[item] : "")
                }}</span
              >
              <div class="padding" @click="selectedArea($event, 'padding')">
                <span class="tip">内边距</span>
                <span
                  class="value"
                  v-for="item in position"
                  :key="`position_${item}`"
                  :class="item"
                >
                  {{
                    defaultValue($props.padding ? $props.padding[item] : "")
                  }}</span
                >
                <div class="content">
                  <span class="tip">内容</span>
                  {{ $props.width }}*{{ $props.height }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-form-item>
  <el-form-item :label="label" v-show="label">
    <div class="setting">
      <div class="top">
        <el-input type="number" />
      </div>
      <div class="center">
        <div class="left"><el-input type="number" /></div>
        <div class="empty">&nbsp;</div>
        <div class="right"><el-input type="number" /></div>
      </div>
      <div class="bottom"><el-input type="number" /></div>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IAroundValue } from "@/components/RenderComponent/Component";
type areaKey = "padding" | "margin" | "border" | "position";
export default defineComponent({
  name: "AroundValue",
  props: {
    padding: Object as PropType<IAroundValue>,
    margin: Object as PropType<IAroundValue>,
    border: Object as PropType<IAroundValue>,
    top: Number,
    right: Number,
    bottom: Number,
    left: Number,
    height: Number,
    width: Number,
  },
  setup() {
    const position = ["top", "right", "bottom", "left"];
    const label = ref("");
    const areaName = {
      padding: "内边距",
      margin: "外边距",
      border: "边框",
      position: "定位",
    };
    const selectedArea = (e: MouseEvent, select: areaKey) => {
      e.stopPropagation();
      label.value = areaName[select];
    };
    return {
      label,
      position,
      defaultValue(val?: number) {
        return val || "-";
      },
      selectedArea,
    };
  },
});
</script>

<style scoped lang="less">
.around {
  .computed {
    cursor: default;

    div {
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding: 15px;
      border: 1px dotted #000;
      position: relative;
      transform: scale(1);
      flex: 1;
      .tip,
      .value {
        position: absolute;
        font-size: 12px;
        width: 50px;
        height: 15px;
        line-height: 15px;
      }
      .tip {
        top: 0;
        left: 0;
        transform: scale(0.8) translate(-3px, 1px);
      }
      .value {
        text-align: center;
        &.top {
          top: 0;
          left: calc(50% - 25px);
        }
        &.left {
          left: 0;
          top: calc(50% - 8px);
          writing-mode: vertical-lr;
        }
        &.right {
          right: -35px;
          top: calc(50% - 8px);
          writing-mode: vertical-lr;
        }
        &.bottom {
          bottom: 0;
          left: calc(50% - 25px);
        }
      }
      .margin {
        border-style: dashed;
        background: rgb(243, 206, 165);
      }
      .border {
        border-style: solid;
        background: rgb(248, 222, 164);
      }
      .padding {
        border-style: dashed;
        background: rgb(198, 208, 147);
      }
      .content {
        background: rgb(150, 181, 192);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }
  }
}
.setting {
  .top,
  .bottom {
    display: flex;
    justify-content: center;
  }
  .center {
    display: flex;
    justify-content: space-between;
  }
  .el-input,
  .empty {
    width: 70px;
  }
}
</style>
