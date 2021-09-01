import { Action } from "@/action/index";
import { IEvent } from "@/event";
import { IRedirect, Redirect } from "@/action/redirect";

export class ActionFactory {
  static getAction(event: IEvent): Action {
    switch (event.actionType) {
      case "redirect":
        return new Redirect(event.actionProps as IRedirect);
    }
  }
}
