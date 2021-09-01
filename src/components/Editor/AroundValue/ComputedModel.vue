<template>
  <div
    :class="[{ selected: selected === modelTree.name }, modelTree.name]"
    @click="select($event, modelTree.name)"
  >
    <span class="tip">{{ modelTree.label }}</span>
    <span
      class="value"
      :class="item.name"
      :key="`${modelTree.name}_${item.name}`"
      v-for="item in modelTree.values"
    >
      {{ item.value }}
    </span>
    <computed-model
      :selected="selected"
      v-if="modelTree.child"
      @selected="updateSelected"
      :model-tree="modelTree.child"
    >
      <slot></slot>
    </computed-model>
    <slot v-if="modelTree.name === 'padding'"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  areaKey,
  IModel,
} from "@/components/Editor/AroundValue/AroundValue.vue";
export default defineComponent({
  name: "ComputedModel",
  props: {
    modelTree: Object as PropType<IModel>,
    selected: String as PropType<areaKey>,
  },
  components: {},
  setup(props, { emit }) {
    return {
      select(e: MouseEvent, area: areaKey) {
        e.stopPropagation();
        emit("selected", area);
      },
      updateSelected(area: areaKey) {
        emit("selected", area);
      },
    };
  },
});
</script>

<style scoped lang="less"></style>
