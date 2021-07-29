import { TComponent } from "@/components/RenderComponent/types";
import { IPage } from "./index";
import { MUTATION_TYPE } from "./mutation-type";
import { MutationTree } from "vuex";
import { DiffPatcher } from "@/util/diffpatch";
import { IState } from "./index";
import { v4 as uuidv4 } from "uuid";

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
      targetComponent: TComponent | undefined;
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
    if (result) state.pages = result;
  },
  // 撤销
  [MUTATION_TYPE.REDO]: (state) => {
    const result = diffPatcher.redo();
    if (result) state.pages = result;
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
  },
  [MUTATION_TYPE.UPDATE_COMPONENT]: (state, payload: TComponent) => {
    mutationWithSnapshot(state, () => {
      const currentPage = state.pages.find(
        (item) => item.id === state.pageActive
      );
      const index = (<IPage>currentPage).components.findIndex(
        (item) => item.id === payload.id
      );
      currentPage!.components[index] = payload;
    });
  },
};
export default mutations;
