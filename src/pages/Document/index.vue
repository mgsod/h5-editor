<template>
  <div class="documents-list">
    <div class="documents-list-item new" @click="newDocument">
      <div class="cover">
        <el-icons name="Plus" />
      </div>
      <div class="name">新建文稿</div>
    </div>
    <div
      class="documents-list-item"
      v-for="item in documentList"
      :key="item._id"
    >
      <div class="cover">
        <div class="font" :style="getStyle(item.cover)"></div>
        <div class="background" :style="getStyle(item.cover, true)"></div>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="action">
        <div class="action-item" @click="edit(item._id)">
          <el-icons name="Edit" />
        </div>
        <div class="action-item">
          <el-icons name="View" />
        </div>
        <div class="action-item" @click="del(item._id)">
          <el-icons name="Delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getDocumentList, delDocument } from "@/api/document";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  name: "index",
  props: {},
  components: {},
  setup() {
    const router = useRouter();
    const documentList = ref([]);

    const refresh = () => {
      getDocumentList().then((res) => {
        if (res.code === 200) {
          documentList.value = res.data;
        }
      });
    };
    refresh();
    return {
      documentList,
      newDocument() {
        localStorage.removeItem("editorData");
        router.push({
          name: "editor",
        });
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
            delDocument(id).then((res) => {
              if (res.code === 200) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                refresh();
              }
            });
          })
          .catch(() => {});
      },
      getStyle(url: string, blur = false) {
        return {
          position: `absolute`,
          top: 0,
          left: 0,
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
    border: 1px solid #e8e8e8;
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
    }

    .name {
      margin-top: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .action {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      &-item {
        flex: 0 0 20px;
        display: flex;
        justify-content: center;
      }
    }

    &.new {
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
