import { createStore } from "vuex";
import { IPage } from "@/store/type";
import mutations from "./mutations";
export default createStore({
  state: {
    pages: <IPage[]>[
      {
        id: "1",
        order: 1,
        components: [],
      },
    ],
    a: 1,
  },
  mutations: {
    ...mutations,
  },
  actions: {},
  modules: {},
});
