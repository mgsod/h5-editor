import Component, {
  IBackground,
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { ICommonText } from "@/components/Editor/RenderComponent/CommonInterface/Text";

export interface IButton extends IComponent, Partial<ICommonText> {
  text: string;
}

export default class Button extends Component implements IButton {
  type = ComponentType.Button;
  width = 120;
  height = 40;
  text = "按钮";
  color = "#fff";
  fontFamily = "";
  fontStyle = "";
  fontWeight = "";
  fontSize = "";
  background: IBackground = {
    color: "#409eff",
  };
  borderRadius = "4,4,4,4";

  constructor(props: IButton) {
    super(props);
    fastInitProps(props, this);
  }
}
