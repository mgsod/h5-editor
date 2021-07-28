import { TComponent } from "@/components/types";
import { IPage } from "@/store/type";
import { MUTATION_TYPE } from "@/store/mutations/mutation-type";
import { MutationTree } from "vuex";
import { DiffPatcher } from "@/util/diffpatch";
const diffPatcher = new DiffPatcher<IPage[]>();

interface IState {
  pages: IPage[];
}
const mutations: MutationTree<IState> = {
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
    diffPatcher.saveSnapshots(leftPage, state.pages);
  },
  [MUTATION_TYPE.UNDO]: (state, payload) => {
    const result = diffPatcher.undo(state.pages);
    console.log("undo", result);
    if (result) state.pages = result;
  },
  [MUTATION_TYPE.REDO]: (state, payload) => {
    const result = diffPatcher.redo(state.pages);
    if (result) state.pages = result;
  },
};
export default mutations;
