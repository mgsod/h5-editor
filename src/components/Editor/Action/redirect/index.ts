import { Action } from "@/components/Editor/Action/abstractAction";
import { Router } from "@/components/Previewer/router";
type RedirectType = "inside" | "outside";
export const redirectTypeList: { name: string; value: RedirectType }[] = [
  { name: "内部跳转", value: "inside" },
  { name: "外部跳转", value: "outside" },
];
export interface IRedirect {
  url: string;
  type: RedirectType;
}
export class Redirect extends Action implements IRedirect {
  url: string;
  type: RedirectType;
  constructor(event: IRedirect) {
    super();
    this.url = event.url;
    this.type = event.type;
  }
  handle() {
    switch (this.type) {
      case "inside":
        Router.go(this.url);
        break;
      case "outside":
        location.href = this.url;
        break;
    }
  }
}
