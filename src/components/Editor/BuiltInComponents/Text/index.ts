import { ComponentType } from "@/components/Editor/ComponentTypes";
import { ICommonText } from "@/components/Editor/BuiltInComponents/CommonInterface/Text";
import { fastInitProps } from "@/util";
import Component, {
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";

export const fontFamilyList: { name: string; value: string }[] = [
  {
    name: "默认",
    value:
      "'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,  sans-serif, 'Droid Sans Fallback'",
  },
  { name: "PingFang-SC-Regular", value: "PingFang-SC-Regular, PingFang-SC" },
  { name: "PingFangSC-Medium", value: "PingFangSC-Medium, PingFang SC" },
  { name: "DINAlternate-Bold", value: "DINAlternate-Bold, DINAlternate;" },
  { name: "继承父级", value: "" },
];

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
  lineHeight = "";
  fontFamily = "";
  textAlign = "";
  fontStyle = "";
  fontWeight = "";
  overflow = false;
  fontSize = "";
  maxLines = 1;
  height = "";

  constructor(props?: IText) {
    super(props);
    fastInitProps(props, this);
  }
}

export default Text;
