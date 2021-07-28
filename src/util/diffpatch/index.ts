import { Config, create, Delta } from "jsondiffpatch";

const diffPatcher = create(<Config>{
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
    true /* default false. if true, values in the obtained delta will be cloned
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
export class DiffPatcher<T> {
  // 快照
  private snapshots: Delta[] = [];
  // 快照索引
  private index = -1;
  // 最后一次更改的行为
  private lastModifyAction: ModifyAction = ModifyAction.Null;
  // 存储快照最大数
  private readonly maxSnapshotLength: number;

  constructor(maxSnapshotLength = 20) {
    this.maxSnapshotLength = maxSnapshotLength;
  }

  // 静态clone函数
  static clone<T>(value: T): T {
    return diffPatcher.clone(value);
  }
  /**
   * 判断此次补丁的行为
   * @param delta 补丁
   * @return ModifyAction
   */
  private static getModifyType(delta: Delta): ModifyAction {
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
  }

  /**
   * 重做
   * @param left 源数据
   */
  redo(left: T): T | false {
    this.index += 1;
    const index = this.index;
    if (!this.snapshots[index]) return false;
    const delta = this.snapshots[index];
    const cloneLeft = diffPatcher.clone(left);
    this.lastModifyAction = DiffPatcher.getModifyType(delta);
    return diffPatcher.patch(cloneLeft, delta);
  }

  /**
   * 撤销
   * @param left 源数据
   */
  undo(left: T): T | false {
    if (this.snapshots.length < 1) return false;
    const cloneLeft = diffPatcher.clone(left);
    const delta = this.snapshots[this.index];
    this.index -= 1;
    this.lastModifyAction = DiffPatcher.getModifyType(delta);
    return diffPatcher.unpatch(cloneLeft, delta);
  }

  /**
   *存储diff快照
   * @param left 原始值
   * @param right 新值
   */
  saveSnapshots(left: T, right: T) {
    const delta = diffPatcher.diff(left, right);
    if (!delta) return;

    // 如果当前快照索引不在最后一个
    if (this.index !== this.snapshots.length - 1) {
      // 删掉当前索引之后的所有快照
      this.snapshots = this.snapshots.slice(0, this.index + 1);
    }
    // 添加索引
    this.index = this.snapshots.push(delta) - 1;
    // 如果超出最大快照数，截取掉前面部分
    if (this.snapshots.length > this.maxSnapshotLength) {
      this.snapshots = this.snapshots.slice(-this.maxSnapshotLength);
    }
  }

  getModifyType(): ModifyAction {
    return this.lastModifyAction;
  }
}
