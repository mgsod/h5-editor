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
          <el-icons name="Edit" @click.stop="edit(item.alias)"></el-icons>
          <el-icons name="Delete" @click.stop="del(item.alias)"></el-icons>
        </div>
      </div>
    </div>
    <el-button class="add" @click="openDialog" type="primary">添加</el-button>
  </div>
  <el-dialog
    v-model="show"
    width="500px"
    top="5%"
    title="新增/编辑数据源"
    @close="reset"
  >
    <el-form
      label-width="100px"
      label-position="left"
      ref="refForm"
      :model="form"
      :rules="formValidateRules"
    >
      <el-form-item label="数据别名" prop="alias">
        <el-input
          placeholder="为该数据设置一个别名，之后通过别名调用数据"
          v-model="form.alias"
        ></el-input>
      </el-form-item>
      <el-form-item label="请求设置"></el-form-item>
      <el-form-item label="接口地址" prop="url">
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
      <el-form-item
        label="body参数"
        prop="body"
        v-show="form.method === 'POST'"
      >
        <el-input
          type="textarea"
          placeholder='{"data":"xxx"}'
          v-model="form.body"
        ></el-input>
      </el-form-item>
      <el-form-item label="headers" prop="headers">
        <el-input
          type="textarea"
          placeholder='{"token":"xxx"}'
          v-model="form.headers"
        ></el-input>
      </el-form-item>
      <el-divider />
      <el-form-item label="响应设置"></el-form-item>
      <el-form-item label="code" prop="code">
        <el-input
          v-model="form.code"
          placeholder="code对应接口返回字段名称,默认为code"
        ></el-input>
      </el-form-item>
      <el-form-item label="msg" prop="msg">
        <el-input
          v-model="form.msg"
          placeholder="msg对应接口返回字段名称,默认为msg"
        ></el-input>
      </el-form-item>
      <el-form-item label="data" prop="data">
        <el-input
          v-model="form.data"
          placeholder="data对应接口返回字段名称,默认为data"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="default" @click="show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  onMounted,
  nextTick,
} from 'vue';
import { useStore } from '@/store';
import { MUTATION_TYPE } from '@/store/Editor/mutations/mutation-type';
import cloneDeep from 'lodash/cloneDeep';
import { FormItemRule } from 'element-plus/lib/components/form/src/form.type';
import { IDataSourceItem } from '@/components/Editor/Action/request';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'datasource',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const show = ref(false);
    const methods = ['GET', 'POST'];
    const refForm = ref();
    const form = reactive({
      alias: '',
      method: 'GET',
      url: '',
      body: '',
      code: '',
      msg: '',
      data: '',
      headers: '',
    });

    const jsonValidator = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback();
      } else {
        try {
          JSON.parse(value);
          callback();
        } catch (e) {
          callback(`请输入标准json串`);
        }
      }
    };
    const formValidateRules: Record<
      keyof Pick<IDataSourceItem, 'alias' | 'body' | 'headers' | 'url'>,
      FormItemRule[]
    > = {
      alias: [
        {
          required: true,
          message: '请输入别名',
        },
      ],
      url: [
        { required: true, message: '请输入接口地址' },
        {
          pattern: /^((https|http)?:\/\/)[^\s]+/,
          message: '请输入正确的请求地址',
        },
      ],
      body: [
        {
          validator: jsonValidator,
          trigger: 'blur',
        },
      ],
      headers: [
        {
          validator: jsonValidator,
          trigger: 'blur',
        },
      ],
    };

    const datasource = computed(() => {
      return store.state.editor.datasource;
    });

    const reset = () => {
      refForm.value.resetFields();
    };
    const edit = (alias: string) => {
      const target = datasource.value[alias];
      Object.assign(form, target);
      show.value = true;
    };
    const save = () => {
      refForm.value.validate((valid: boolean) => {
        if (valid) {
          store.commit(MUTATION_TYPE.UPDATE_DATASOURCE, {
            target: form.alias,
            data: cloneDeep(form),
          });
          show.value = false;
          reset();
        }
      });
    };
    const del = (alias: string) => {
      ElMessageBox.confirm('确认删除该数据源吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        store.commit(MUTATION_TYPE.DELETE_DATASOURCE, alias);
      });
    };
    return {
      methods,
      form,
      show,
      datasource,
      formValidateRules,
      refForm,
      openDialog() {
        show.value = true;
      },
      save,
      del,
      reset,
      edit,
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
