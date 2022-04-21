import Component, {
  IBackground,
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { fastInitProps } from "@/util";

export type NoticeBarMode = "link" | "closeable" | "";
export const NoticeBarModeList: { name: string; value: NoticeBarMode }[] = [
  { name: "链接", value: "link" },
  { name: "关闭", value: "closeable" },
  { name: "无", value: "" },
];

export interface INoticeBar extends IComponent {
  text: string;
  color: string;
  mode?: NoticeBarMode;
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
