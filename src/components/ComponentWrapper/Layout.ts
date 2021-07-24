/**
 *
 */
export enum Position {
  Relative = "relative",
  Absolute = "absolute",
}
export enum TextAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}
export enum JustifyContent {
  FlexStart = "flex-start",
  Center = "center",
  FlexEnd = "flex-end",
  SpaceAround = "space-around",
  SpaceBetween = "space-between",
  SpaceEvenly = "space-evenly",
}
export enum AlignItems {
  Auto = "auto",
  FlexStart = "flex-start",
  Center = "center",
  FlexEnd = "flex-end",
  Stretch = "stretch",
  BaseLine = "baseline",
}
export type AlignSelf = AlignItems;
export type AlignContent = AlignItems;

export interface Layout {
  display?: "flex";
  textAlign?: TextAlign;
  JustifyContent?: JustifyContent;
  AlignItems?: AlignItems;
  AlignSelf?: AlignSelf;
  AlignContent?: AlignContent;
}
