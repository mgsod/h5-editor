<template>
  <div v-if="selectedId">
    <el-button type="primary" @click="showDialog = true">新增</el-button>
    <el-table :data="eventList" empty-text="暂无事">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="事件类型" width="80">
        <template v-slot="{ row }">
          {{ getEventTypeName(row.eventType) }}
        </template>
      </el-table-column>
      <el-table-column label="触发动作" width="80">
        <template v-slot="{ row }">
          {{ getEventHandleName(row.actionType) }}
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot="{ row, $index }">
          <el-button type="text" @click="edit(row, $index)">编辑</el-button>
          <el-button
            class="del"
            type="text"
            @click="del($index)"
            style="margin-left: 5px"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog width="30%" title="新增/编辑事件" v-model="showDialog">
    <el-form :model="eventForm">
      <el-form-item label="事件类型">
        <el-select v-model="eventForm.eventType">
          <el-option
            v-for="item in EventTypeList"
            :key="item.value"
            :value="item.value"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触发动作">
        <el-select v-model="eventForm.actionType">
          <el-option
            v-for="item in ActionList"
            :key="item.value"
            :value="item.value"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="跳转地址"
        v-show="eventForm.actionType === 'redirect'"
      >
        <el-input v-model="eventForm.actionProps.url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { useStore } from "@/store";
import { IComponent } from "@/components/Editor/RenderComponent/Component";
import { EventTypeList, EventType, IEvent } from "@/components/Editor/event";
import { ActionType, ActionList } from "@/components/Editor/action";
import { MUTATION_TYPE } from "@/store/Editor/mutation-type";
import useDialog from "@/hooks/useDialog";
export default defineComponent({
  name: "event-bar",
  props: {},
  components: {},
  setup() {
    const store = useStore();
    const selectedId = computed(() => {
      return store.state.editor.selectedComponents?.id;
    });
    const { showDialog } = useDialog();
    const editIndex = ref(-1);
    let eventForm = reactive<IEvent>({
      eventType: "click",
      actionType: "redirect",
      actionProps: {
        url: "",
        content: "",
      },
    });
    const eventList = computed(() => {
      const currentComponent = store.state.editor
        .selectedComponents as IComponent;
      if (currentComponent) return currentComponent.events;
      return [];
    });

    const confirm = () => {
      // 编辑
      if (editIndex.value > -1) {
        store.commit(MUTATION_TYPE.UPDATE_EVENT, {
          eventIndex: editIndex.value,
          event: eventForm,
        });
      } else {
        // 新增
        store.commit(MUTATION_TYPE.ADD_EVENT, eventForm);
      }
      editIndex.value = -1;
      showDialog.value = false;
    };
    const getEventTypeName = (type: EventType) => {
      return EventTypeList.find((item) => {
        return item.value === type;
      })?.name;
    };
    const getEventHandleName = (handle: ActionType) => {
      return ActionList.find((item) => {
        return item.value === handle;
      })?.name;
    };
    return {
      showDialog,
      eventList,
      eventForm,
      EventTypeList,
      ActionList,
      selectedId,
      confirm,
      getEventTypeName,
      getEventHandleName,
      del(index: number) {
        store.commit(MUTATION_TYPE.REMOVE_EVENT, index);
      },
      edit(row: IEvent, index: number) {
        showDialog.value = true;
        eventForm.eventType = row.eventType;
        eventForm.actionType = row.actionType;
        eventForm.actionProps = {
          url: row.actionProps.url,
          content: "",
        };
        editIndex.value = index;
        return;
      },
    };
  },
});
</script>

<style scoped lang="less">
.el-table {
  .el-button.del {
    color: var(--el-color-danger);
  }
}
</style>
