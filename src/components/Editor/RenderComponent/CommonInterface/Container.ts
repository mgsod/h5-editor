/**
 * 继承于基础组件的容器组件基类
 */
import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { PartOfComponent } from "@/components/Editor/RenderComponent/types";

export interface ICommonContainer extends IComponent {
  isContainer: boolean;
  // 是否是根，包括页面的根，tab组件中的根容器
  // isRoot = true 表示不可拖拽、缩放
  isRoot?: boolean;
  children: PartOfComponent[];
}

export class CommonContainer extends Component implements ICommonContainer {
  isContainer = true;
  children: PartOfComponent[] = [];

  constructor(props?: ICommonContainer) {
    super(props);
    fastInitProps(props, this);
  }
}
