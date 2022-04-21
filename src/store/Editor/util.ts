import { IPage, IState } from "@/store/Editor/index";
import { v4 as uuidv4 } from "uuid";
import { findItemById, getCache } from "@/util";
import { DiffPatcher } from "@/util/diffpatch";
import ComponentFactory from "@/components/Editor/Factory";
import {
  ComponentType,
  PartOfComponent,
  TComponent,
} from "@/components/Editor/ComponentTypes";

// 缓存key
export const CACHE_KEY = "editorData";

export interface IEditorCache {
  editorData: IState;
  diffPatcher: DiffPatcher<IPage[]>;
}

const cache = getCache<IEditorCache>(CACHE_KEY);
// 实例化diffPatcher
export const diffPatcher = new DiffPatcher<IPage[]>(cache?.diffPatcher);

/**
 * 新增一页
 * @param state
 */
export const addPage = (state: IState) => {
  const id = uuidv4();
  state.pages.push({
    order: 0,
    components: [],
    id,
    name: `页面${state.pages.length + 1}`,
  });
  state.pageActive = id;
  (state.pages.find((item) => item.id === id) as IPage).components.push(
    ComponentFactory.createComponent(ComponentType.Container, {
      id: "root",
      width: 375,
      height: "",
      position: "relative",
      isRoot: true,
      alias: "根组件",
    })
  );
  state.selectedComponents = null;
};

/**
 * 更新当前选中的组件（目的是同步右侧与画布中的属性设置）
 * @param state
 */
export const updateSelectedComponent = (state: IState) => {
  if (state.selectedComponents) {
    const currentPage = state.pages.find(
      (item) => item.id === state.pageActive
    ) as IPage;
    const find = findItemById<PartOfComponent>(
      currentPage.components,
      state.selectedComponents.id as string
    );
    if (find) {
      state.selectedComponents = { ...find };
    } else {
      state.selectedComponents = null;
    }
  }
};

/**
 * 更新撤销重做状态，以标识当前是否可以撤销/重做
 * @param state
 */
export const updateRedoUndoState = (state: IState) => {
  state.allowUndo = diffPatcher.allowUndo();
  state.allowRedo = diffPatcher.allowRedo();
};
/**
 * 带快照的mutation
 * @param state
 * @param callback
 */
export const mutationWithSnapshot = (state: IState, callback: () => void) => {
  const left = DiffPatcher.clone(state.pages);
  callback();
  // 记录快照
  diffPatcher.saveSnapshots(left, state.pages);
  updateRedoUndoState(state);
};
