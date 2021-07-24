<template>
  <div class="property-bar"></div>
</template>

<script>
export default {
  name: "property",
  props: {},
  components: {},
  setup() {},
};
</script>

<style scoped lang="less">
.property-bar {
  width: 350px;
  height: 100%;
  background: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
}
</style>
