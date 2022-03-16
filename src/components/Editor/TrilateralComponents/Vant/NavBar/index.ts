import Component, {
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/ComponentTypes";
import { Position } from "@/components/Editor/BuiltInComponents/Layout";

export interface INavBar extends IComponent {
  title: string;
  showBack: boolean;
}

export default class NavBar extends Component implements INavBar {
  type = ComponentType.NavBar;
  title = "标题";
  width = 375;
  height = 46;
  top = 0;
  left = 0;
  showBack = true;
  position: Position = "absolute";

  constructor(props: INavBar) {
    super(props);
    fastInitProps(props, this);
  }
}
