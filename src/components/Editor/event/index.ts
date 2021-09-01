import { ActionProps, ActionType } from "@/components/Editor/action";

export type EventType = "click" | "mouseenter" | "mouseleave";
export interface IEvent {
  eventType: EventType;
  actionType: ActionType;
  actionProps: Partial<ActionProps>;
}
export const EventTypeList: { name: string; value: EventType }[] = [
  { name: "点击", value: "click" },
  { name: "鼠标进入", value: "mouseenter" },
  { name: "鼠标离开", value: "mouseleave" },
];
