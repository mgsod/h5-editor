<template>
  <el-config-provider :locale="locale" :zIndex="zIndex">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
      zIndex: 1500,
    };
  },
});
</script>
