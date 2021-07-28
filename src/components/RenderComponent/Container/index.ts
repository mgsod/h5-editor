import Component, { IComponent } from "@/components/RenderComponent/Component";
import {
  AlignItems,
  JustifyContent,
  Layout,
  TextAlign,
} from "@/components/RenderComponent/Layout";
import Util from "@/util";
import { ComponentType } from "@/components/RenderComponent/types";
export interface IContainer extends IComponent, Layout {
  isContainer: boolean;
  children: Component[];
}

/**
 * 容器组件，继承与基础组件，实现容器的接口
 */
class Container extends Component implements IContainer {
  type = ComponentType.Container;
  isContainer = true;
  children: Component[] = [];
  textAlign: TextAlign = "left";
  JustifyContent: JustifyContent = "flex-start";
  AlignItems: AlignItems = "flex-start";
  constructor(props?: IContainer) {
    super(props);
    Util.FastInitProps(props, this);
  }
}
export default Container;
