<template>
  <div class="page">
    <div class="header"></div>
    <div class="content">
      <div class="slider">
        <el-menu
          router
          :default-active="activePage"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/documents">
            <span>文档库</span>
          </el-menu-item>
          <!-- <el-menu-item index="/components">
                      <span>自定义组件库</span>
                    </el-menu-item> -->
        </el-menu>
      </div>
      <div class="content-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Documents',
  setup() {
    const route = useRoute();
    const activePage = computed(() => {
      return route.path;
    });
    return {
      activePage,
    };
  },
});
</script>

<style scoped lang="less">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .header {
    flex: 0 0 45px;
    width: 100%;
    background: #001529;
  }

  .content {
    display: flex;
    flex: auto;
    height: 0;

    .slider {
      flex: 0 0 200px;
      border-right: solid 1px #e6e6e6;

      :deep(.el-menu) {
        border: none;
      }
    }

    .content-container {
      flex: auto;
      padding: 8px 15px;
      overflow: scroll;
    }
  }
}
</style>
