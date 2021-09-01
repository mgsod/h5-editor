// 动作类型
export type ActionType = "redirect";

// 重定向接口
export interface IRedirect {
  url: string;
}

// 动作参数
export type ActionProps = IRedirect;

export abstract class Action {
  actionProps: IRedirect;
  protected constructor(actionProps: ActionProps) {
    this.actionProps = actionProps;
  }
  abstract handle(): void;
}

export const ActionList: { name: string; value: ActionType }[] = [
  { name: "链接跳转", value: "redirect" },
];
