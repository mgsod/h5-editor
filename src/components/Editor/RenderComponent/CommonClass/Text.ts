import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
export interface ICommonText extends IComponent {
  color: string;
  fontFamily: string;
  fontSize: string | number;
  fontWeight: string;
  fontStyle: string;
  textAlign: string;
  lineHeight?: string;
}
export class CommonText extends Component implements ICommonText {
  color = "#000";
  fontFamily =
    "'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,  sans-serif, 'Droid Sans Fallback'";
  fontSize: string | number = 14;
  fontStyle = "normal";
  fontWeight = "normal";
  textAlign = "left";
  constructor(props?: ICommonText) {
    super(props);
    fastInitProps(props, this);
  }
}
