import { ref } from "vue";
export default () => {
  const showDialog = ref(false);
  return {
    showDialog,
  };
};
