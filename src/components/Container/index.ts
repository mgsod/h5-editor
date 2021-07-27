import Component, { IComponent } from "@/components/Component";
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  JustifyContent,
  Layout,
  TextAlign,
} from "@/components/Layout";
export interface IContainer extends IComponent, Layout {
  isContainer: true;
  children: Component[];
}
/**
 * 容器组件，继承与基础组件，实现容器的接口
 */
class Container extends Component implements IContainer {
  isContainer: true;
  children: Component[] = [];
  textAlign: TextAlign = "left";
  JustifyContent: JustifyContent = "flex-start";
  AlignItems: AlignItems = "flex-start";
  AlignSelf: AlignSelf = "flex-start";
  AlignContent: AlignContent = "flex-start";
  constructor(props: IContainer) {
    super(props);
    this.children = props.children || [];
    this.isContainer = true;
  }
}

export default Container;
