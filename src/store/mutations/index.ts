import { TComponent } from "@/components/types";
import { IPage } from "@/store/type";
import { MUTATION_TYPE } from "@/store/mutations/mutation-type";
import { MutationTree } from "vuex";
import { diffPatcher, getModifyType } from "@/util/diffpatch";

const a = [
  { id: "1", a: 1 },
  //{ id: "2", a: 2, c: 1, b: 2, gg: 2 },
  //{ id: "3", a: 3 },
  { id: "4", a: 4 },
];

console.log("left", a);
const c = [
  { id: "1", a: 1 },
  { id: "4", a: 4 },
  // { id: "3", a: 3 },
  //{ id: 5, a: 5 },
];

console.log("right", c);
const delta = diffPatcher.diff(a, c);
console.log(2, delta);
console.log("修改类型", getModifyType(delta));

//console.log(3, diff(a, c));

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
    const page = <IPage>state.pages.find((item: IPage) => item.id === pageId);
    if (targetComponent) {
      targetComponent.children.push(component);
    } else {
      page.components.push(component);
    }
  },
  [MUTATION_TYPE.UNDO]: (state, payload) => {},
};
export default mutations;
