import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import {
  AlignItems,
  TextAlign,
  display,
} from "@/components/Editor/RenderComponent/Layout";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/RenderComponent/types";

// 主轴（横轴）方向上的对齐方式
export enum JUSTIFY_CONTENT {
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  BETWEEN = "space-between",
  AROUND = "space-around",
}

export const JustifyContentList = [
  { name: "左对齐", value: JUSTIFY_CONTENT.START },
  { name: "右对齐", value: JUSTIFY_CONTENT.END },
  { name: "居中对齐", value: JUSTIFY_CONTENT.CENTER },
  { name: "两端对齐", value: JUSTIFY_CONTENT.BETWEEN },
  { name: "等分间隔", value: JUSTIFY_CONTENT.AROUND },
];

export enum ALIGN_ITEMS {
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  BASELINE = "baseline",
  STRETCH = "stretch",
}
export const AlignItemsList = [
  { name: "默认（撑满容器）", value: ALIGN_ITEMS.STRETCH },
  { name: "起点对齐", value: ALIGN_ITEMS.START },
  { name: "终点对齐", value: ALIGN_ITEMS.END },
  { name: "居中对齐", value: ALIGN_ITEMS.CENTER },
  { name: "文本基线对齐", value: ALIGN_ITEMS.BASELINE },
];

// 布局类型
export enum DISPLAY {
  BLOCK = "block",
  FLEX = "flex",
}
export const displayList = [
  {
    name: "默认布局",
    value: DISPLAY.BLOCK,
  },
  {
    name: "弹性布局",
    value: DISPLAY.FLEX,
  },
];

export interface Layout {
  display: display;
  textAlign?: TextAlign;
  JustifyContent?: JUSTIFY_CONTENT;
  AlignItems?: AlignItems;
}

export interface IContainer extends IComponent, Layout {
  isContainer: boolean;
  children: IComponent[];
}

/**
 * 容器组件，继承与基础组件，实现容器的接口
 */
class Container extends Component implements IContainer {
  type = ComponentType.Container;
  isContainer = true;
  children: Component[] = [];
  textAlign: TextAlign = "left";
  JustifyContent: JUSTIFY_CONTENT = JUSTIFY_CONTENT.START;
  AlignItems: ALIGN_ITEMS = ALIGN_ITEMS.STRETCH;
  width = 200;
  height = 200;
  display: DISPLAY = DISPLAY.BLOCK;
  constructor(props?: IContainer) {
    super(props);
    fastInitProps(props, this);
  }
}
export default Container;
