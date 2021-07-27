import { Config, create, Delta } from "jsondiffpatch";

export const diffPatcher = create(<Config>{
  // used to match objects when diffing arrays, by default only === operator is used
  // 在对象数组中，根据objectHash来匹配对象
  objectHash: function (obj) {
    // this function is used only to when objects are not equal by ref
    return obj._id || obj.id;
  },
  arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: true,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false,
  },
  textDiff: {
    // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
    minLength: 60,
  },
  // 过滤掉不需要监听的属性
  propertyFilter: function (name, context) {
    /*
   this optional function can be specified to ignore object properties (eg. volatile data)
    name: property name, present in either context.left or context.right objects
    context: the diff context (has context.left and context.right objects)
  */
    return name.slice(0, 1) !== "$";
  },
  cloneDiffValues:
    false /* default false. if true, values in the obtained delta will be cloned
      (using jsondiffpatch.clone by default), to ensure delta keeps no references to left or right objects. this becomes useful if you're diffing and patching the same objects multiple times without serializing deltas.
      instead of true, a function can be specified here to provide a custom clone(value)
      */,
});

export enum ModifyAction {
  Create = "create",
  Remove = "remove",
  Move = "moveIndex",
  Update = "update",
  Null = "null",
}

/**
 * 判断此次补丁的行为
 * @param delta 补丁
 * @return ModifyAction
 */
export const getModifyType = (delta?: Delta): ModifyAction => {
  if (!delta) return ModifyAction.Null;
  const originType = delta._t;
  delete delta._t;
  //  获取key
  const key = Object.keys(delta)[0];
  const firstDelta = delta[key];

  // 新增 或 修改某个属性
  if (!key.startsWith("_")) {
    const modify = firstDelta[Object.keys(firstDelta)[0]];
    // 新增
    if (Array.isArray(modify)) {
      return ModifyAction.Update;
    }
    return ModifyAction.Create;
  } else {
    const modify = firstDelta;
    if (modify[1] === 0 && modify[2] === 0) {
      // 删除
      return ModifyAction.Remove;
    }
    return ModifyAction.Move;
  }
};
