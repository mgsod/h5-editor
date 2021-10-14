import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { ICommonText } from "@/components/Editor/RenderComponent/CommonInterface/Text";
import { fastInitProps } from "@/util";
import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";

export interface IText extends IComponent, ICommonText {
  text?: string;
  overflow: boolean;
  maxLines?: number;
  fontSize: string | number;
}
class Text extends Component implements IText {
  type = ComponentType.Text;
  text = "text";
  color = "";
  lineHeight = "inherit";
  fontFamily = "inherit";
  textAlign = "inherit";
  fontStyle = "inherit";
  fontWeight = "inherit";
  overflow = false;
  fontSize = "";
  maxLines = 1;
  constructor(props?: IText) {
    super(props);
    fastInitProps(props, this);
  }
}

export default Text;
