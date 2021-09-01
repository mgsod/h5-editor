// 动作类型
import { IRedirect } from "@/components/Editor/action/redirect";
import { IAlert } from "@/components/Editor/action/alert";
export type ActionType = "redirect" | "alert";

// 动作参数
export type ActionProps = IRedirect & IAlert;

export const ActionList: { name: string; value: ActionType }[] = [
  { name: "链接跳转", value: "redirect" },
  { name: "弹窗", value: "alert" },
];
