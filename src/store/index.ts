import { createStore } from "vuex";
import moduleEditor from "./mudules/editor";
export default createStore({
  modules: {
    editor: moduleEditor,
  },
  getters: {
    a() {
      return 1;
    },
  },
});
