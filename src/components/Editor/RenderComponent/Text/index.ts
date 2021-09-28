import { ComponentType } from "@/components/Editor/RenderComponent/types";
import {
  CommonText,
  ICommonText,
} from "@/components/Editor/RenderComponent/CommonClass/Text";
import { fastInitProps } from "@/util";

export interface IText extends ICommonText {
  text?: string;
  overflow: boolean;
  maxLines?: number;
  fontSize: string | number;
}
class Text extends CommonText implements IText {
  type = ComponentType.Text;
  text = "text";
  color = "";
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
