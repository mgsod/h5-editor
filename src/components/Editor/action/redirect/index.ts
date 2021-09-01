import { Action } from "@/components/Editor/action/abstractAction";

export interface IRedirect {
  url: string;
}
export class Redirect extends Action implements IRedirect {
  public url: string;
  constructor(event: IRedirect) {
    super();
    this.url = event.url;
  }
  handle() {
    location.href = this.url;
  }
}
