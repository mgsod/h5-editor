import Component from "@/components/ComponentWrapper/BaseComponent";
import { IContainer, TComponent } from "@/components/ComponentWrapper/types";
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  JustifyContent,
  TextAlign,
} from "@/components/ComponentWrapper/Layout";

/**
 * 容器组件，继承与基础组件，实现容器的接口
 */
class Container extends Component implements IContainer {
  isContainer: true;
  children: TComponent[] = [];
  textAlign: TextAlign = TextAlign.Left;
  JustifyContent: JustifyContent = JustifyContent.FlexStart;
  AlignItems: AlignItems = AlignItems.FlexStart;
  AlignSelf: AlignSelf = AlignItems.FlexStart;
  AlignContent: AlignContent = AlignItems.FlexStart;
  constructor(props: IContainer) {
    super(props);
    this.children = props.children || [];
    this.isContainer = true;
  }
}

export default Container;
