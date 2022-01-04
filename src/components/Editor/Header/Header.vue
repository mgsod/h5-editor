<template>
  <div class="header">
    <div class="action" @click="exportJson">导出JSON</div>
    <div class="action" @click="save">保存</div>
    <div class="action" @click="clearLocalCache">清除本地缓存</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useStore } from "@/store";
import { downLoadContent } from "@/util";
import { ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash";
import { IDocument } from "../../../../server/src/document";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
import { CACHE_KEY } from "@/store/Editor/util";
import { addDocument, IEditorDoc, updateDocument } from "@/api/document";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Header",
  props: {},
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const documentInfo = inject<IDocument>("documentInfo");
    const coverR = ref("");
    const getCanvasByHtml2canvas = (): Promise<HTMLCanvasElement> => {
      let bigCanvas = document.createElement("canvas");

      const dashboard_canvas = (
        document.getElementById("root") as HTMLElement
      ).cloneNode(true) as HTMLElement;
      bigCanvas.height = dashboard_canvas.scrollHeight * 2;
      bigCanvas.width = dashboard_canvas.scrollWidth * 2;
      dashboard_canvas.style.height = "600px";
      document.body.appendChild(dashboard_canvas);
      return new Promise((resolve) => {
        html2canvas(dashboard_canvas, {
          useCORS: true,
          /* width: bigCanvas.width * 2,
           height: bigCanvas.height * 2,
           canvas: bigCanvas,*/
        }).then((canvas) => {
          resolve(canvas);
          dashboard_canvas.remove();
        });
      });
    };
    return {
      coverR,
      exportJson() {
        downLoadContent(
          `${new Date().getTime()}.json`,
          JSON.stringify(store.state.editor.pages, null, 2)
        );
      },
      async save() {
        const canvas = await getCanvasByHtml2canvas();
        const cover = canvas.toDataURL("image/png", 1.0);
        ElMessageBox.prompt("请输入文稿名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue:
            documentInfo?.name ||
            `文稿${new Date().toLocaleDateString().replace("/", "")}`,
          inputValidator(v) {
            if (!v) return "请输入文稿名称";
            return true;
          },
        }).then(({ value: name }) => {
          const data = {
            name,
            content: {
              pages: cloneDeep(store.state.editor.pages),
              extractComponents: cloneDeep(
                store.state.editor.extractComponents
              ),
            },
            cover,
            _id: "",
          };

          // 更新
          if (documentInfo?._id) {
            data._id = documentInfo._id;
            updateDocument(data).then((res) => {
              if (res.code === 200) {
                ElMessage.success("更新成功");
              }
            });
          } else {
            addDocument(data).then((res) => {
              if (res.code === 200) {
                const { _id } = res.data;
                ElMessage.success("添加成功");
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
      clearLocalCache() {
        localStorage.removeItem(CACHE_KEY);
        location.reload();
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
