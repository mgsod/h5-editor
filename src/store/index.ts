import { createStore } from "vuex";
import { IPage } from "@/store/type";
import { COMPONENT_MUTATION_TYPE } from "@/store/mutationTypes";
import { TComponent } from "@/components/ComponentWrapper/types";

export default createStore({
  state: {
    pages: <IPage[]>[
      {
        id: "1",
        order: 1,
        components: [],
      },
    ],
  },
  mutations: {
    [COMPONENT_MUTATION_TYPE.ADD_COMPONENT]: (
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
      const page = <IPage>state.pages.find((item) => item.id === pageId);

      if (targetComponent) {
        targetComponent!.children!.push(component);
      } else {
        page.components.push(component);
      }
    },
  },
  actions: {},
  modules: {},
});
