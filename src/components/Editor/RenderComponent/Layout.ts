// 定位
export type Position = "static" | "relative" | "absolute";
export const positionList: {
  name: string;
  value: Position;
}[] = [
  { name: "静止", value: "static" },
  { name: "相对定位", value: "relative" },
  { name: "绝对定位", value: "absolute" },
];

export const layoutType = [
  {
    name: "默认布局",
    value: "block",
  },
  {
    name: "弹性布局",
    value: "flex",
  },
];
// 文本对齐
export type TextAlign = "left" | "center" | "right";

// 交叉轴（纵轴）方向上的对齐方式
export type AlignItems =
  | "auto"
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline";
// flex子项单独在交叉轴（纵轴）方向上的对齐方式
export type AlignSelf = AlignItems;
// flex多行时，整体在交叉轴上的对齐方式
export type AlignContent = AlignItems;
// 外边距
export type Margin =
  | "margin-top"
  | "margin-right"
  | "margin-bottom"
  | "margin-left";
// 内边距
export type Padding =
  | "padding-top"
  | "padding-right"
  | "padding-bottom"
  | `padding-left`;

export type Border =
  | "border-top-width"
  | "border-right-width"
  | "border-bottom-width"
  | `border-left-width`;

export type BorderStyle = "dotted" | "solid" | "dashed";
export const borderStyleList: { name: string; value: BorderStyle }[] = [
  { name: "点状", value: "dotted" },
  { name: "实线", value: "solid" },
  { name: "虚线", value: "dashed" },
];

export type display = "block" | "flex";
