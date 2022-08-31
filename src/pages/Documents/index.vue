<template>
  <div class="documents">
    <div class="documents-list" v-loading="loading">
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
              <a :href="item.previewUrl" target="_blank">链接访问</a>
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
            <div
              class="action-item"
              @click="item.qrcodeShow = !item.qrcodeShow"
            >
              <el-icons name="Share" />
            </div>
          </div>
        </el-card>
      </div>
      <preview-dialog
        v-model="showDialog"
        :pages="currentPages"
        :datasource="datasource"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getDocumentList, delDocument, IEditorDoc } from '@/api/document';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import qrcode from 'qrcode';
import previewDialog from '@/components/Previewer/previewDialog.vue';
import useDialog from '@/hooks/useDialog';
import { IDocument } from '../../../server/src/document';
import { IPage } from '@/store/Editor';

export default defineComponent({
  name: 'Documents',
  components: { previewDialog },
  setup() {
    const router = useRouter();
    const documentList = ref([]);
    const { showDialog } = useDialog();
    const loading = ref(true);
    const refresh = () => {
      getDocumentList()
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach(async (item: any) => {
              item.qrcodeShow = false;
              item.qrcode = await qrcode.toDataURL(
                `${location.origin}${item.previewUrl}`
              );
              item.updatedAt = new Date(item.updatedAt).toLocaleString();
            });
            documentList.value = res.data;
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const currentPages = ref<IPage[]>([]);
    const datasource = ref();
    refresh();
    return {
      loading,
      documentList,
      showDialog,
      preview(item: IDocument<IEditorDoc>) {
        showDialog.value = true;
        currentPages.value = item.content.pages;
        datasource.value = item.content.datasource;
      },
      currentPages,
      datasource,
      newDocument() {
        localStorage.removeItem('editorData');
        const { href } = router.resolve({
          name: 'editor',
        });
        localStorage.removeItem('editorData');
        window.open(href, '_blank');
      },
      edit(id: string) {
        const { href } = router.resolve({
          name: 'editor',
          query: {
            id,
          },
        });
        localStorage.removeItem('editorData');
        window.open(href, '_blank');
      },
      del(id: string) {
        ElMessageBox.confirm('确认删除该文档吗？', '⚠️警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delDocument(id).then((res) => {
              if (res.code === 200) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                });
                refresh();
              }
            });
          })
          .catch(() => {});
      },
      getStyle(url: string) {
        return {
          'background-image': `url(${url})`,
        };
      },
    };
  },
});
</script>

<style scoped lang="less">
.documents {
  display: flex;
  flex-direction: column;
  height: 100%;

  .documents-list {
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;

    &-item {
      width: 200px;
      height: 294px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;

      .cover {
        position: relative;
        height: 220px;
        overflow: hidden;
        border-bottom: 1px solid #e8e8e8;

        .background,
        .font {
          position: absolute;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .background {
          z-index: 0;
          filter: blur(4px);
        }

        .font {
          z-index: 1;
          width: 70%;
          margin: 0 15%;
        }

        .qrcode {
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: #fff;

          img {
            height: auto;
          }
        }
      }

      .name {
        margin-top: 10px;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .lastupdate {
        margin: 5px 0;
        font-size: 12px;
        color: #999;
        text-align: center;
      }

      .action {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;

        &-item {
          display: flex;
          flex: 0 0 20px;
          justify-content: center;
        }
      }

      &.new {
        .el-card {
          height: 100%;

          :deep(.el-card__body) {
            display: flex;
            flex-direction: column;
            height: 100%;

            .name {
              display: flex;
              flex: auto;
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

  .el-pagination {
    text-align: right;
  }
}
</style>
