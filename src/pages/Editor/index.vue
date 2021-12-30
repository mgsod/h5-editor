<template>
  <div class="editor">
    <Header />
    <div class="content">
      <sidebar />
      <H5Canvas />
      <property-bar />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Editor/Sidebar/index.vue";
import PropertyBar from "@/components/Editor/SettingBar/index.vue";
import H5Canvas from "@/components/Editor/Canvas/index.vue";
import { useStore } from "@/store";
import { onMounted, provide, reactive } from "vue";
import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import Header from "@/components/Editor/Header/Header.vue";
import axios from "@/axios/index";
import { IDocument } from "../../../server/document";
import { useRoute, useRouter } from "vue-router";
import { getCache } from "@/util";
import { CACHE_KEY, IEditorCache } from "@/store/Editor/util";
import { ElMessage } from "element-plus";

export default {
  name: "Index",
  props: {},
  components: {
    Sidebar,
    PropertyBar,
    H5Canvas,
    Header,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      query: { id },
    } = route;

    const documentInfo = reactive<IDocument>({
      name: "",
      _id: "",
      content: [],
      cover: "",
    });
    provide("documentInfo", documentInfo);
    const store = useStore();
    store.commit(MUTATION_TYPE.INIT);

    function loadByLocalCache() {
      // 从缓存中回显数据
      const localCache = getCache<IEditorCache>(CACHE_KEY)?.editorData;
      if (localCache) {
        store.commit(MUTATION_TYPE.LOAD_BY_CACHE, localCache);
      }
    }

    // 如果有id，获取文档。从接口中回显数据
    if (id) {
      axios.get<IDocument>(`/document/${id}`).then((res) => {
        if (res.code === 200) {
          if (res.data) {
            const { name, content, _id } = res.data;
            documentInfo._id = _id;
            documentInfo.name = name;
            documentInfo.content = content;
            store.commit(MUTATION_TYPE.LOAD, content);
            store.commit(
              MUTATION_TYPE.SELECT_PAGE,
              (content.pages[0] as any).id
            );
          } else {
            ElMessage.error("该文档不存在,新建一个空白文档");
            router.push({
              name: "editor",
            });
          }
          loadByLocalCache();
        }
      });
    } else {
      loadByLocalCache();
    }
    onMounted(() => {
      document.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "KeyZ":
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              store.commit(MUTATION_TYPE.UNDO);
            }
            break;
          case "KeyY":
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              store.commit(MUTATION_TYPE.REDO);
            }
            break;
          case "KeyA":
            if (e.ctrlKey || e.metaKey) {
              console.log(11);
            }
            break;
          case "Backspace":
            //e.preventDefault();
            //store.commit(MUTATION_TYPE.REMOVE_COMPONENT);
            break;
        }
      });
    });
  },
};
</script>

<style scoped lang="less">
.editor {
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: #eef2f7;
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 45px;
  }

  .content {
    flex: auto;
    display: flex;
    position: relative;
    background: #eef2f7;

    .sidebar {
      flex: 0 0 300px;
      box-sizing: border-box;
    }

    .canvas-wrapper {
      flex: auto;
    }
  }
}
</style>
