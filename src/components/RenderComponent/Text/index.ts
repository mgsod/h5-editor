import Component, { IComponent } from "@/components/RenderComponent/Component";
import { ComponentType } from "@/components/RenderComponent/types";

export interface IText extends IComponent {
  text?: string;
  color: string;
  fontFamily: string;
  fontSie: number;
  fontWeight: string;
  fontStyle: string;
  textAlign: string;
}
class Text extends Component implements IText {
  type = ComponentType.Text;
  text = "Text";
  color = "#000";
  fontFamily =
    "'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,  sans-serif, 'Droid Sans Fallback'";
  fontSie = 14;
  fontStyle = "normal";
  fontWeight = "normal";
  textAlign = "left";
  constructor(props?: IText) {
    super(props);
  }
}

export default Text;
