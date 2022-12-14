<template>
  <div>
    <!-- v-show="selected === 'border'"   -->
    <div>
      <el-form-item label="边框样式">
        <el-select v-model="BorderStyle">
          <el-option
            v-for="item in borderStyleList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker v-model="BorderColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="圆角">
        <el-input v-model="BorderRadius">
          <!--          <template #append>
            <i class="el-icon-s-operation"></i>
          </template>-->
        </el-input>
      </el-form-item>
    </div>
    <div class="setting">
      <div class="top">
        <el-input
          type="number"
          :disabled="!selected"
          v-model.number="aroundValues.top"
        />
      </div>
      <div class="center">
        <div class="left">
          <el-input
            :disabled="!selected"
            v-model.number="aroundValues.left"
            type="number"
          />
        </div>
        <div class="around">
          <div class="computed">
            <computed-model
              @selected="selectedArea"
              :selected="selected"
              :model-tree="computedModelTree"
            >
              <div class="content">
                <span class="tip">内容</span>
                {{ componentSize }}
              </div>
            </computed-model>
          </div>
        </div>
        <div class="right">
          <el-input
            :disabled="!selected"
            v-model.number="aroundValues.right"
            type="number"
          />
        </div>
      </div>
      <div class="bottom">
        <el-input
          :disabled="!selected"
          v-model.number="aroundValues.bottom"
          type="number"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { IAroundValue } from '@/components/Editor/BuiltInComponents/Component';
import ComputedModel from '@/components/Editor/AroundValue/ComputedModel.vue';
import {
  BorderStyle,
  borderStyleList,
} from '@/components/Editor/BuiltInComponents/Layout';
import { useStore } from '@/store';

export type areaKey = 'padding' | 'margin' | 'border' | 'position';
type areaColor = Record<areaKey, string>;
export type positionKey = 'top' | 'right' | 'bottom' | 'left';
type areaValue = number | string | undefined;

interface IModelValue {
  name: positionKey;
  value: string | number | undefined;
}

export interface IModel {
  name: areaKey;
  label: string;
  values: IModelValue[];
  child?: IModel;
}

export default defineComponent({
  name: 'AroundValue',
  props: {
    padding: Object as PropType<IAroundValue>,
    margin: Object as PropType<IAroundValue>,
    border: Object as PropType<IAroundValue>,
    borderStyle: String as PropType<BorderStyle>,
    borderColor: String,
    left: [Number, String],
    top: [Number, String],
    right: [Number, String],
    bottom: [Number, String],
    borderRadius: [String],
  },
  components: { ComputedModel },
  setup(props, { emit }) {
    const store = useStore();
    const position: positionKey[] = ['top', 'right', 'bottom', 'left'];
    const selected = ref<areaKey | ''>('');
    const isChange = ref(false);
    const aroundValues: {
      top: areaValue;
      left: areaValue;
      right: areaValue;
      bottom: areaValue;
    } = reactive({
      top: undefined,
      left: undefined,
      right: undefined,
      bottom: undefined,
    });
    const BorderRadius = computed({
      get() {
        return props.borderRadius;
      },
      set(val?: string) {
        let arr: string[] = [];
        if (val) {
          arr = val.split(',');
          const hasLength = arr.length;
          if (arr.length < 4) {
            for (let i = hasLength; i < 4; i++) {
              arr.push('0');
            }
          }
          if (arr.length > 4) {
            arr.length = 4;
          }
        }
        emit('update:borderRadius', arr.toString());
      },
    });
    const selectedArea = (select: areaKey) => {
      if (store.state.editor.selectedComponents?.id === 'root') return;
      isChange.value = true;
      selected.value = select;
      let top, left, bottom, right;
      if (select === 'position') {
        ({ top, left, bottom, right } = props);
      } else if (props[select]) {
        ({ top, left, bottom, right } = props[select] as IAroundValue);
      }
      aroundValues.top = top;
      aroundValues.left = left;
      aroundValues.bottom = bottom;
      aroundValues.right = right;
      setTimeout(() => {
        isChange.value = false;
      });
    };
    const componentSize = ref('');
    const computedModelTree: IModel = reactive({
      name: 'position',
      label: '定位',
      values: position.map((item) => {
        return {
          name: item,
          value: computed(() => {
            return props[item] || '-';
          }),
        };
      }),
      child: {
        name: 'margin',
        label: '外边距',
        values: position.map((item) => {
          return {
            name: item,
            value: computed(() => {
              return props.margin ? props.margin[item] : '-';
            }),
          };
        }),
        child: {
          name: 'border',
          label: '边框',
          values: position.map((item) => {
            return {
              name: item,
              value: computed(() => {
                return props.border ? props.border[item] : '-';
              }),
            };
          }),
          child: {
            name: 'padding',
            label: '内边距',
            values: position.map((item) => {
              return {
                name: item,
                value: computed(() => {
                  return props.padding ? props.padding[item] : '-';
                }),
              };
            }),
          },
        },
      },
    });
    const selectedComponents = computed(() => {
      return store.state.editor.selectedComponents || { id: 'none' };
    });
    const BorderStyle = computed({
      get() {
        return props.borderStyle;
      },
      set(val) {
        emit('update:borderStyle', val);
      },
    });
    const BorderColor = computed({
      get() {
        return props.borderColor;
      },
      set(val) {
        emit('update:borderColor', val);
      },
    });

    watch(aroundValues, (a, b) => {
      if (isChange.value || !selected.value) return;
      if (selected.value === 'position') {
        position.forEach((item: positionKey) => {
          emit(`update:${item}`, aroundValues[item]);
        });
      } else {
        emit(`update:${selected.value}`, { ...aroundValues });
      }
    });
    const selectedComponentId = computed(() => {
      return selectedComponents.value.id;
    });
    // 只有切换了选择的组件才会触发
    watch(selectedComponentId, () => {
      selected.value = '';
      aroundValues.top = undefined;
      aroundValues.bottom = undefined;
      aroundValues.left = undefined;
      aroundValues.right = undefined;
    });
    watchEffect(async () => {
      const select = store.state.editor.selectedComponents;
      if (select) {
        const { id } = select;

        let horizontal = 0,
          vertical = 0;
        if (props.border) {
          const { left = 0, right = 0, top = 0, bottom = 0 } = props.border;
          horizontal += left + right;
          vertical += top + bottom;
        }
        if (props.padding) {
          const { left = 0, right = 0, top = 0, bottom = 0 } = props.padding;
          horizontal += left + right;
          vertical += top + bottom;
        }

        await nextTick();
        setTimeout(() => {
          const dom = document.getElementById(id) as HTMLElement;
          componentSize.value = `${dom.offsetWidth - horizontal}x${
            dom.offsetHeight - vertical
          }`;
        });
      }
    });

    return {
      aroundValues,
      position,
      selected,
      computedModelTree,
      componentSize,
      borderStyleList,
      BorderColor,
      BorderStyle,
      BorderRadius,
      defaultValue(val?: number) {
        return val || '-';
      },
      selectedArea,
    };
  },
});
</script>

<style scoped lang="less">
.around {
  margin: 15px auto;

  :deep(.computed) {
    cursor: default;

    .position,
    .margin,
    .border,
    .padding,
    .content {
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding: 15px 13px;
      border: 1px dotted #000;
      position: relative;
      color: #000;
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
          left: -2px;
          top: calc(50% - 8px);
          writing-mode: vertical-lr;
        }

        &.right {
          right: -38px;
          top: calc(50% - 8px);
          writing-mode: vertical-lr;
        }

        &.bottom {
          bottom: 0;
          left: calc(50% - 25px);
        }
      }

      &.selected {
        background: var(--el-color-primary);
        color: #fff;
      }
    }

    .content {
      background: rgb(150, 181, 192);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
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
  }
}

.setting {
  .top,
  .bottom {
    display: flex;
    justify-content: center;
    width: 99px;
    margin: 0 auto;
  }

  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .around {
      flex: 0 0 188px;
      margin: 8px;
    }

    .left,
    .right {
      flex: 1;

      .el-input {
        :deep(input) {
          padding: 0 2px 0 5px !important;
        }
      }
    }
  }
}
</style>
