<template>
  <div>Index</div>
</template>

<script lang="js">
import { create } from "jsondiffpatch";

const jsondiffpatch = create();
const arr = [{ id: 1, name: 1 }];
const arr1 = [
  { id: 1, name: 1 },
  { id: 2, name: 2 }
];
const delta = jsondiffpatch.diff(arr,arr1)
console.log('delta',delta)


const arr2 = [
  { id: 1, name: 1 },
  { id: 2, name: 2},
  { id: 3, name: 3 },
]
const delta1 = jsondiffpatch.diff(arr1,arr2)
console.log('delta2',delta1)






console.log(jsondiffpatch.patch(arr,delta1))


export default {
  name: "index",
  props: {},
  components: {},
  setup() {
  }
};
</script>

<style scoped lang="less"></style>
