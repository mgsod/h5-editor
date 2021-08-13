import Component, { IComponent } from "@/components/RenderComponent/Component";
import {
  AlignItems,
  JustifyContent,
  Layout,
  TextAlign,
} from "@/components/RenderComponent/Layout";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/RenderComponent/types";
export interface IContainer extends IComponent, Layout {
  isContainer: boolean;
  children: IComponent[];
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
  width = 200;
  height = 200;
  constructor(props?: IContainer) {
    super(props);
    fastInitProps(props, this);
  }
}
export default Container;
