<template>
  <div class="datasource">
    <div class="list"></div>
    <el-button class="add" type="primary">添加</el-button>
  </div>
  <el-dialog
    class="dialog"
    v-model="show"
    width="500px"
    top="5%"
    title="新增/编辑数据源"
  >
    <el-form label-width="100px" label-position="left" :model="form">
      {{ parseExpression(e) }}
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
      <el-button type="default">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import useDataSource from '@/hooks/useDataSource';
import useDynamicVars from '@/hooks/useDynamicVars';
export default defineComponent({
  name: 'datasource',
  components: {},
  props: {},
  setup() {
    const show = ref(true);
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
    const { request } = useDataSource();
    const { parseExpression } = useDynamicVars();
    return {
      methods,
      form,
      show,
      save() {
        request('document');
      },
      parseExpression,
      e: '{{name}}',
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
  }
}
</style>
