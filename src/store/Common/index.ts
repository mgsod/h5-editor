import { ActionContext, Module } from "vuex";
import { state } from "@/store";
import axios from "@/axios";

export interface ICommonState {
  host: string;
}

const module: Module<ICommonState, state> = {
  state: {
    host: "",
  },
  mutations: {
    modifyHost(state: ICommonState, payload) {
      state.host = payload;
    },
  },
  actions: {
    getHost(context) {
      axios.get("/host").then((res) => {
        if (res.code === 200) {
          context.commit("modifyHost", res.data);
        }
      });
    },
  },
};

export default module;
