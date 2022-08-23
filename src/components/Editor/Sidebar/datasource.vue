<template>
  <div class="datasource">
    <div class="list">
      <div
        class="list-item"
        title="点击查看数据"
        v-for="item in datasource"
        :key="item.alias"
      >
        <div class="name">{{ item.alias }}</div>
        <div class="actions">
          <el-icons name="Edit" @click.stop="edit"></el-icons>
          <el-icons name="Delete" @click.stop="del"></el-icons>
        </div>
      </div>
    </div>
    <el-button class="add" @click="openDialog" type="primary">添加</el-button>
  </div>
  <el-dialog v-model="show" width="500px" top="5%" title="新增/编辑数据源">
    <el-form label-width="100px" label-position="left" :model="form">
      <el-form-item label="数据对象别名">
        <el-input v-model="form.alias"></el-input>
      </el-form-item>
      <el-form-item label="请求设置"></el-form-item>
      <el-form-item label="接口地址">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="请求方式">
        <el-select v-model="form.method">
          <el-option
            v-for="item in methods"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="body参数" v-show="form.method === 'POST'">
        <el-input v-model="form.body"></el-input>
      </el-form-item>
      <el-divider />
      <el-form-item label="响应设置"></el-form-item>
      <el-form-item label="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="msg">
        <el-input v-model="form.msg"></el-input>
      </el-form-item>
      <el-form-item label="data">
        <el-input v-model="form.data"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="default" @click="show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from '@/store';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import cloneDeep from 'lodash/cloneDeep';
export default defineComponent({
  name: 'datasource',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const show = ref(false);
    const methods = ['GET', 'POST'];
    const form = reactive({
      alias: 'document',
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/document',
      body: '',
      code: 'code',
      msg: 'message',
      data: 'data',
    });
    const datasource = computed(() => {
      return store.state.editor.datasource;
    });

    const reset = () => {
      form.alias = '';
      form.url = '';
      form.body = '';
      form.code = '';
      form.msg = '';
      form.data = '';
    };
    const save = () => {
      store.commit(MUTATION_TYPE.ADD_DATASOURCE, {
        target: form.alias,
        data: cloneDeep(form),
      });
      show.value = false;
      reset();
    };
    return {
      methods,
      form,
      show,
      datasource,
      openDialog() {
        show.value = true;
      },
      save,
      edit() {},
      del() {},
    };
  },
});
</script>
<style lang="less" scoped>
.datasource {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-right: 8px;

  .list {
    flex: auto;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 8px;
      cursor: pointer;
      border-bottom: 1px solid #f0f4f5;
      border-radius: 5px;

      &.active,
      &:hover {
        color: #fff;
        background: var(--el-color-primary);
      }

      .actions {
        i {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
