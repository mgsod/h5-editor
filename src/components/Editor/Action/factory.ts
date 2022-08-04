import { Action } from '@/components/Editor/Action/abstractAction';
import { IEvent } from '@/components/Editor/Event';
import { IRedirect, Redirect } from '@/components/Editor/Action/redirect';
import { Alert, IAlert } from '@/components/Editor/Action/alert';

export class ActionFactory {
  static getAction(event: IEvent): Action {
    switch (event.actionType) {
      case 'redirect':
        return new Redirect(event.actionProps as IRedirect);
      case 'alert':
        return new Alert(event.actionProps as IAlert);
    }
  }
}
