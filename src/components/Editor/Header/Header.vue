<template>
  <div class="header">
    <div class="action" @click="exportJson">导出JSON</div>
    <div class="action" @click="save">保存</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useStore } from "@/store";
import { downLoadContent } from "@/util";
import axios, { CustomInstance } from "@/axios";
import { ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash";
import { IDocument } from "../../../../server/document";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Header",
  props: {},
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const documentInfo = inject<IDocument>("documentInfo");
    return {
      exportJson() {
        downLoadContent(
          `${new Date().getTime()}.json`,
          JSON.stringify(store.state.editor.pages, null, 2)
        );
      },
      save() {
        ElMessageBox.prompt("请输入文稿名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: `文稿${new Date().toLocaleDateString().replace("/", "")}`,
          inputValidator(v) {
            if (!v) return "请输入文稿名称";
            return true;
          },
        }).then(({ value: name }) => {
          const data = { name, content: cloneDeep(store.state.editor.pages) };

          // 更新
          if (documentInfo?._id) {
            axios
              .put<IDocument>(`/document/${documentInfo._id}`, data)
              .then((res) => {
                if (res.code === 200) {
                  console.log("更新成功");
                }
              });
          } else {
            axios.post<IDocument>(`/document`, data).then((res) => {
              if (res.code === 200) {
                const { _id } = res.data;
                router.push({
                  path: "/editor",
                  query: {
                    id: _id,
                  },
                });
              }
            });
          }
        });
      },
    };
  },
});
</script>

<style scoped lang="less">
.header {
  font-size: 14px;
  height: 65px;
  background-color: #001529;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;

  .action {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
