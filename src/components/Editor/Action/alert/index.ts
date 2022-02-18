import { Action } from "@/components/Editor/Action/abstractAction";

export interface IAlert {
  content: string;
}

export class Alert extends Action implements IAlert {
  content: string;
  constructor(props: IAlert) {
    super();
    this.content = props.content;
  }
  handle() {
    alert(this.content);
  }
}
