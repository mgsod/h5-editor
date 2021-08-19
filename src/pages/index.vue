<template>
  <div>Index</div>
</template>

<script lang="js">
import { create } from "jsondiffpatch";

const jsondiffpatch = create();
const arr = [
  { id: 1, name: 1 },
  { id: 2, name: 2 }
];
const arr1 = [{ id: 1, name: 1 }];

const arr3 = [
  { id: 1, name: 1 },
  { id: 2, name: 3},
  { id: 3, name: 3 },
]

const delta = jsondiffpatch.diff(arr,arr1)
console.log('delta',delta)

const delta1 = jsondiffpatch.diff(arr,arr3)
console.log('delta2',delta1)

console.log(jsondiffpatch.unpatch(arr3,delta1))


export default {
  name: "index",
  props: {},
  components: {},
  setup() {
  }
};
</script>

<style scoped lang="less"></style>
