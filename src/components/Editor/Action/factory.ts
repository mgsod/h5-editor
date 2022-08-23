import { Action } from '@/components/Editor/Action/abstractAction';
import { IEvent } from '@/components/Editor/Event';
import { IRedirect, Redirect } from '@/components/Editor/Action/redirect';
import { Alert, IAlert } from '@/components/Editor/Action/alert';
import { IRequest, Request } from '@/components/Editor/Action/request';

export class ActionFactory {
  static getAction(event: IEvent, payload?: any): Action {
    switch (event.actionType) {
      case 'redirect':
        return new Redirect(event.actionProps as IRedirect);
      case 'alert':
        return new Alert(event.actionProps as IAlert);
      case 'request':
        return new Request(event.actionProps as IRequest, payload);
    }
  }
}
