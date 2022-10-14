<template>
  <el-upload
    accept="image/jpeg,image/jpg,image/png"
    name="singleFile"
    ref="uploader"
    action="/upload"
    :http-request="upload"
    :limit="1"
    class="avatar-uploader"
    :show-file-list="false"
  >
    <el-icons name="Plus" />
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UploadRequestOptions } from 'element-plus/es/components/upload/src/upload.d';
import axios from '@/axios';

export default defineComponent({
  name: 'Uploader',
  props: {},
  components: {},
  emits: ['success'],
  setup(props, { emit }) {
    const uploader = ref();
    const upload = (params: UploadRequestOptions) => {
      const { action, file } = params;
      const fd = new FormData();
      fd.append('singleFile', file, file.name);
      axios
        .post(action, fd)
        .then((res) => {
          if (res.code === 200) {
            emit('success', res.data);
          }
        })
        .finally(() => {
          uploader.value.clearFiles();
        });
    };
    return {
      uploader,
      upload,
    };
  },
});
</script>
