import { ActionProps, ActionType } from "@/components/Editor/Action";

export type EventType = "click" | "mouseenter" | "mouseleave" | "mounted";
export interface IEvent {
  eventType: EventType;
  actionType: ActionType;
  actionProps: Partial<ActionProps>;
}
export const EventTypeList: { name: string; value: EventType }[] = [
  { name: "点击", value: "click" },
  { name: "鼠标进入", value: "mouseenter" },
  { name: "鼠标离开", value: "mouseleave" },
  { name: "初始化", value: "mounted" },
];
// 把EventType每个类型作为key，再把IEvent作为值
export type EventTypeKey = Record<EventType, IEvent[]>;
