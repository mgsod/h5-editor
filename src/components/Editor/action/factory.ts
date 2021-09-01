import { Action } from "@/components/Editor/action/abstractAction";
import { IEvent } from "@/components/Editor/event";
import { IRedirect, Redirect } from "@/components/Editor/action/redirect";
import { Alert, IAlert } from "@/components/Editor/action/alert";

export class ActionFactory {
  static getAction(event: IEvent): Action {
    switch (event.actionType) {
      case "redirect":
        return new Redirect(event.actionProps as IRedirect);
      case "alert":
        return new Alert(event.actionProps as IAlert);
    }
  }
}
