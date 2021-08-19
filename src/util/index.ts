import { debounce } from "lodash";
import { Commit } from "vuex";

// 树桩结构接口
export interface ITree<T> {
  id: string;
  children?: T[];
}

export const fastInitProps = (source: any, target: any) => {
  if (source) {
    for (const prop in source) {
      target[prop] = source[prop];
    }
  }
};
export const objectMerge = (source: any, target: any) => {
  if (source) {
    for (const prop in source) {
      target[prop] = source[prop];
    }
    for (const prop in target) {
      // eslint-disable-next-line no-prototype-builtins
      if (!source.hasOwnProperty(prop)) {
        delete target[prop];
      }
    }
  }
};

export function findItemById<T extends ITree<T>>(
  tree: T[],
  id: string
): T | null {
  let result = null;
  tree.forEach((item) => {
    if (item.id === id) {
      result = item;
      return;
    }
    if (item.children && item.children?.length > 0) {
      result = findItemById<T>(item.children, id);
      return;
    }
  });
  return result;
}

export function findItemAndParentById<T extends ITree<T>>(
  tree: T[],
  id: string
): { parent: T[]; index: number } | null {
  let result = null;
  tree.forEach((item, index) => {
    if (item.id === id) {
      result = { parent: tree, index };
      return;
    }
    if (item.children && item.children?.length > 0) {
      result = findItemAndParentById<T>(item.children, id);
      return;
    }
  });
  return result;
}

export function getDebounceCommit<T>(commit: Commit, commitType: string) {
  const commitHandel = (payload?: T) => {
    commit(commitType, payload);
  };
  return debounce(commitHandel, 500);
}
