import { ComponentType, TComponent } from "@/components/RenderComponent/types";
import { IPage, IState } from "./index";
import { MUTATION_TYPE } from "./mutation-type";
import { MutationTree } from "vuex";
import { DiffPatcher } from "@/util/diffpatch";
import { v4 as uuidv4 } from "uuid";
import ComponentFactory from "@/components/RenderComponent/Factory";
import { IContainer } from "@/components/RenderComponent/Container";
import { findItemById } from "@/util";
import Component, { IComponent } from "@/components/RenderComponent/Component";
const diffPatcher = new DiffPatcher<IPage[]>();
const addPage = (state: IState) => {
  const id = uuidv4();
  state.pages.push({
    order: 0,
    components: [],
    id,
  });
  state.pageActive = id;
};
const updateSelectedComponent = (state: IState) => {
  if (state.selectedComponents) {
    const currentPage = state.pages.find(
      (item) => item.id === state.pageActive
    ) as IPage;
    state.selectedComponents = findItemById<Component>(
      currentPage.components,
      state.selectedComponents.id as string
    );
  }
};

/**
 * 带快照的更改
 * @param state
 * @param callback
 */
const mutationWithSnapshot = (state: IState, callback: () => void) => {
  const left = DiffPatcher.clone(state.pages);
  callback();
  // 记录快照
  diffPatcher.saveSnapshots(left, state.pages);
};
const mutations: MutationTree<IState> = {
  // 添加一个组件
  [MUTATION_TYPE.ADD_COMPONENT]: (
    state,
    {
      targetComponent,
      component,
    }: {
      targetComponent: IContainer | undefined;
      component: TComponent;
    }
  ) => {
    mutationWithSnapshot(state, () => {
      const page = <IPage>(
        state.pages.find((item: IPage) => item.id === state.pageActive)
      );
      if (targetComponent) {
        targetComponent.children.push(component);
      } else {
        page.components.push(component);
      }
    });
  },
  // 重做
  [MUTATION_TYPE.UNDO]: (state) => {
    const result = diffPatcher.undo();
    if (result) {
      state.pages = result;
      updateSelectedComponent(state);
    }
  },
  // 撤销
  [MUTATION_TYPE.REDO]: (state) => {
    const result = diffPatcher.redo();
    if (result) {
      state.pages = result;
      updateSelectedComponent(state);
    }
  },
  // 新增一页
  [MUTATION_TYPE.ADD_PAGE]: (state) => {
    mutationWithSnapshot(state, () => {
      addPage(state);
    });
  },
  // 初始化
  [MUTATION_TYPE.INIT]: (state) => {
    state.pages = [];
    addPage(state);
    state.pages[0].components.push(
      ComponentFactory.createComponent(ComponentType.Container, {
        id: "root",
        width: 375,
        height: 600,
      })
    );
  },
  [MUTATION_TYPE.UPDATE_COMPONENT]: (state, payload: TComponent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      ) as IPage;
      const target = findItemById<Component>(
        currentPage.components,
        payload.id
      );
      console.log("shoudao", target, currentPage.components, payload.id);
      if (target) {
        Object.assign(target, { ...payload });
      }
    });
  },
  [MUTATION_TYPE.SELECT_COMPONENT]: (state, payload: TComponent) => {
    state.selectedComponents = payload;
  },
};
export default mutations;
