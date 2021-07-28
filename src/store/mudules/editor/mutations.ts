import { TComponent } from "@/components/RenderComponent/types";
import { IPage } from "./index";
import { MUTATION_TYPE } from "./mutation-type";
import { MutationTree } from "vuex";
import { DiffPatcher } from "@/util/diffpatch";
import { IState } from "./index";
const diffPatcher = new DiffPatcher<IPage[]>();
const mutations: MutationTree<IState> = {
  // 添加一个组件
  [MUTATION_TYPE.ADD_COMPONENT]: (
    state,
    {
      pageId,
      targetComponent,
      component,
    }: {
      pageId: string;
      targetComponent: TComponent | undefined;
      component: TComponent;
    }
  ) => {
    const leftPage = DiffPatcher.clone(state.pages);
    const page = <IPage>state.pages.find((item: IPage) => item.id === pageId);
    if (targetComponent) {
      targetComponent.children.push(component);
    } else {
      page.components.push(component);
    }
    // 记录快照
    diffPatcher.saveSnapshots(leftPage, state.pages);
  },
  // 重做
  [MUTATION_TYPE.UNDO]: (state) => {
    const result = diffPatcher.undo(state.pages);
    if (result) state.pages = result;
  },
  // 撤销
  [MUTATION_TYPE.REDO]: (state) => {
    const result = diffPatcher.redo(state.pages);
    if (result) state.pages = result;
  },
  [MUTATION_TYPE.ADD_PAGE]: (state) => {
    const id = new Date().getTime().toString();
    state.pages.push({
      order: 0,
      components: [],
      id,
    });
    state.pageActive = id;
  },
};
export default mutations;
