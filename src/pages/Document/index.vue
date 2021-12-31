<template>
  <div class="documents-list">
    <div class="documents-list-item new" @click="newDocument">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="cover">
          <el-icons name="Plus" />
        </div>
        <div class="name">新建文稿</div>
      </el-card>
    </div>
    <div
      class="documents-list-item"
      v-for="item in documentList"
      :key="item._id"
    >
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="cover">
          <div class="font" :style="getStyle(item.cover)"></div>
          <div class="background" :style="getStyle(item.cover, true)"></div>
          <div class="qrcode" v-show="item.qrcodeShow">
            <img :src="item.qrcode" alt="" />
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="lastupdate">{{ item.updatedAt }}</div>
        <div class="action">
          <div class="action-item" @click="edit(item._id)">
            <el-icons name="Edit" />
          </div>
          <div class="action-item" @click="preview(item)">
            <el-icons name="View" />
          </div>
          <div class="action-item" @click="del(item._id)">
            <el-icons name="Delete" />
          </div>
          <div class="action-item" @click="item.qrcodeShow = !item.qrcodeShow">
            <el-icons name="Share" />
          </div>
        </div>
      </el-card>
    </div>
    <preview-dialog v-model="showDialog" :pages="currentPages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getDocumentList, delDocument, IEditorDoc } from "@/api/document";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import qrcode from "qrcode";
import previewDialog from "@/components/Previewer/previewDialog.vue";
import useDialog from "@/hooks/useDialog";
import { IDocument } from "../../../server/document";
import { IPage } from "@/store/Editor";

export default defineComponent({
  name: "Documents",
  components: { previewDialog },
  setup() {
    const router = useRouter();
    const documentList = ref([]);
    const { showDialog } = useDialog();
    const refresh = () => {
      getDocumentList().then((res) => {
        if (res.code === 200) {
          res.data.forEach(async (item: any) => {
            item.qrcode = await qrcode.toDataURL(
              `http://10.0.232.118:3000/static/index.html?id=${item._id}`
            );
            item.qrcodeShow = false;
            item.updatedAt = new Date(item.updatedAt).toLocaleString();
          });
          documentList.value = res.data;
        }
      });
    };
    const currentPages = ref<IPage[]>([]);
    refresh();
    return {
      documentList,
      showDialog,
      preview(item: IDocument<IEditorDoc>) {
        showDialog.value = true;
        currentPages.value = item.content.pages;
      },
      currentPages,
      newDocument() {
        localStorage.removeItem("editorData");
        const { href } = router.resolve({
          name: "editor",
        });
        localStorage.removeItem("editorData");
        window.open(href, "_blank");
      },
      edit(id: string) {
        const { href } = router.resolve({
          name: "editor",
          query: {
            id,
          },
        });
        localStorage.removeItem("editorData");
        window.open(href, "_blank");
      },
      del(id: string) {
        ElMessageBox.confirm("确认删除该文档吗？", "⚠️警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            /*delDocument(id).then((res) => {
              if (res.code === 200) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                refresh();
              }
            });*/
          })
          .catch(() => {});
      },
      getStyle(url: string, blur = false) {
        return {
          "z-index": blur ? 0 : 1,
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-image": `url(${url})`,
          filter: blur ? "blur(10px)" : "none",
        };
      },
    };
  },
});
</script>

<style scoped lang="less">
.documents-list {
  padding: 8px 15px;
  display: flex;
  flex-wrap: wrap;

  &-item {
    width: 200px;
    margin-bottom: 15px;
    margin-left: 15px;
    cursor: pointer;

    .cover {
      height: 220px;
      border-bottom: 1px solid #e8e8e8;
      position: relative;
      overflow: hidden;

      .background {
        width: 100%;
        height: 100%;
        filter: blur(10px);
        position: absolute;
        z-index: 0;
      }

      .font {
        height: 100%;
        position: absolute;
        width: 70%;
        margin: 0px 15%;
        z-index: 1;
      }

      .qrcode {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        background: #fff;

        img {
          height: auto;
        }
      }
    }

    .name {
      margin-top: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .lastupdate {
      text-align: center;
      margin: 5px 0;
      font-size: 12px;
      color: #999999;
    }

    .action {
      display: flex;
      justify-content: space-between;
      padding: 10px;

      &-item {
        flex: 0 0 20px;
        display: flex;
        justify-content: center;
      }
    }

    &.new {
      .el-card {
        height: 100%;

        :deep(.el-card__body) {
          height: 100%;
          display: flex;
          flex-direction: column;

          .name {
            flex: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .cover {
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
