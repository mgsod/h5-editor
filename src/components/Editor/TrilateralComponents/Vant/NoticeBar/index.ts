import Component, {
  IBackground,
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";
import { ComponentType } from "@/components/Editor/BuiltInComponents/types";
import { fastInitProps } from "@/util";

export interface INoticeBar extends IComponent {
  text: string;
  color: string;
}

export default class NoticeBar extends Component implements INoticeBar {
  type = ComponentType.NoticeBar;
  text = "这是一段通知文本";
  height = 40;
  color = "#ed6a0c";
  background: IBackground = {
    color: "#fffbe8",
  };

  constructor(props: INoticeBar) {
    super(props);
    fastInitProps(props, this);
  }
}
