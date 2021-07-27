// 定位
export type Position = "relative" | "absolute";
// 文本对齐
export type TextAlign = "left" | "center" | "right";
// 主轴（横轴）方向上的对齐方式
export type JustifyContent =
  | "flex-start"
  | "center"
  | " flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";

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
type padding = "padding";
export type Padding =
  | "padding-top"
  | "padding-right"
  | "padding-bottom"
  | `${padding}-left`;

export interface Layout {
  display?: "flex";
  textAlign?: TextAlign;
  JustifyContent?: JustifyContent;
  AlignItems?: AlignItems;
  AlignSelf?: AlignSelf;
  AlignContent?: AlignContent;
}
