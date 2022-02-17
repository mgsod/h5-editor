import { MUTATION_TYPE } from "@/store/Editor/mutations/mutation-type";
import {
  ComponentType,
  TComponent,
} from "@/components/Editor/BuiltInComponents/types";
import {
  mutationWithSnapshot,
  updateSelectedComponent,
} from "@/store/Editor/util";
import { IPage, IState } from "@/store/Editor";
import { findItemAndParentById, findItemById } from "@/util";
import { IComponent } from "@/components/Editor/BuiltInComponents/Component";
import eventBus, { EventType } from "@/hooks/useEventBus";
import { IContainer } from "@/components/Editor/BuiltInComponents/Container";
import { MutationTree } from "vuex";
import { ITab } from "@/components/Editor/BuiltInComponents/Tab";
import { ElMessageBox } from "element-plus";

const componentMutations: MutationTree<IState> = {
  // 新增一个组件
  [MUTATION_TYPE.ADD_COMPONENT]: (
    state: IState,
    {
      targetComponent,
      component,
    }: {
      targetComponent: IContainer | undefined | ITab;
      component: TComponent;
    }
  ) => {
    mutationWithSnapshot(state, () => {
      const page = <IPage>(
        state.pages.find((item: IPage) => item.id === state.pageActive)
      );

      // 是否添加到目标容器
      if (targetComponent) {
        let _target = targetComponent;
        if (targetComponent.type === ComponentType.Tab) {
          _target = (targetComponent as ITab).children[
            (targetComponent as ITab).active
          ] as IContainer | ITab;
        }
        component.parentId = _target.id;
        _target.children.push(component);
      } else {
        page.components.push(component);
      }
    });
    state.enterContainer = null;
    state.isDrag = false;
  },
  // 拖拽一个组件
  [MUTATION_TYPE.DRAG_COMPONENT]: (state: IState, payload = true) => {
    state.isDrag = payload;
    state.enterContainer = null;
  },
  // 更新组件信息
  [MUTATION_TYPE.UPDATE_COMPONENT]: (state: IState, payload: TComponent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<IComponent>(
        currentPage.components,
        payload.id
      );
      if (target) {
        Object.assign(target, { ...payload });
        updateSelectedComponent(state);
      }
    });
  },
  // 选中一个组件
  [MUTATION_TYPE.SELECT_COMPONENT]: (state: IState, payload?: TComponent) => {
    if (payload) {
      // 如果选中的id和当前已选一致
      if (payload.id === state.selectedComponents?.id) return;
    } else {
      payload = <TComponent>state.selectedComponents;
    }
    // 如果不存在
    if (!payload) return;
    // 设置当前选中的组件
    state.selectedComponents = { ...payload };
    // 通知更新虚拟边框
    eventBus.$emit(EventType.updateBorder, payload.id);
  },
  // 移除一个组件
  [MUTATION_TYPE.REMOVE_COMPONENT]: (state: IState) => {
    // 前提是当前已经有选中的组件
    if (state.selectedComponents) {
      mutationWithSnapshot(state, () => {
        // 查询当前所在页面
        const currentPage = state.pages.find(
          (item) => item.id === state.pageActive
        ) as IPage;
        // 找到容器
        const target = findItemAndParentById<IComponent>(
          currentPage.components,
          (state.selectedComponents as IComponent).id
        );
        if (target) {
          // 删除
          target.parent.splice(target.index, 1);
        }
        // 更新选中的组件信息
        updateSelectedComponent(state);
      });
    }
  },
  // 鼠标进入容器
  [MUTATION_TYPE.ENTER_CONTAINER]: (state: IState, target) => {
    state.enterContainer = target;
  },
  // 鼠标离开容器
  [MUTATION_TYPE.LEAVE_CONTAINER]: (state: IState) => {
    state.enterContainer = null;
  },
  // 抽离组件
  [MUTATION_TYPE.EXTRACT_COMPONENT]: (
    state: IState,
    { name, component }: { name: string; component: TComponent }
  ) => {
    if (state.extractComponents.find((item) => item.name === name)) {
      return ElMessageBox({
        type: "warning",
        title: "错误",
        message: `${name}组件已存在`,
      });
    }
    component.alias = name;
    state.extractComponents.push({
      name,
      payload: component,
    });
  },
  [MUTATION_TYPE.DELETE_EXTRACT_COMPONENT]: (state: IState, name: string) => {
    const index = state.extractComponents.findIndex(
      (item) => item.name === name
    );
    state.extractComponents.splice(index, 1);
  },
};
export default componentMutations;
