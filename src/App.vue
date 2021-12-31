<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useStore();
    store.dispatch("getHost");
    return {
      locale: zhCn,
    };
  },
});
</script>
