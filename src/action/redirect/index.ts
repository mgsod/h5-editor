import { Action } from "@/action";

export interface IRedirect {
  url: string;
}
export class Redirect extends Action implements IRedirect {
  public url: string;
  constructor(event: IRedirect) {
    super(event);
    this.url = event.url;
  }
  handle() {
    location.href = this.url;
  }
}
