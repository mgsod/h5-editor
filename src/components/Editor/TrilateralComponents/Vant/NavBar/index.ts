import Component, {
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Position } from "@/components/Editor/BuiltInComponents/Layout";

export interface INavBar extends IComponent {
  title: string;
}

export default class NavBar extends Component implements INavBar {
  type = ComponentType.NavBar;
  title = "标题";
  width = 375;
  height = 44;
  position: Position = "absolute";
  top = 0;
  left = 0;

  constructor(props: INavBar) {
    super(props);
    fastInitProps(props, this);
  }
}
