import Component, { IComponent } from "@/components/RenderComponent/Component";
import { ComponentType } from "@/components/RenderComponent/types";

export interface IText extends IComponent {
  text?: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  textAlign: string;
  overflow: boolean;
  lineHeight?: string;
  maxLines?: number;
}
class Text extends Component implements IText {
  type = ComponentType.Text;
  text = "Text";
  color = "#000";
  fontFamily =
    "'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,  sans-serif, 'Droid Sans Fallback'";
  fontSize = 14;
  fontStyle = "normal";
  fontWeight = "normal";
  textAlign = "left";
  overflow = false;
  maxLines = 1;
  constructor(props?: IText) {
    super(props);
  }
}

export default Text;
