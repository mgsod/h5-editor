/**
 * 继承于基础组件的容器组件基类
 */
import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
export interface ICommonContainer extends IComponent {
  isContainer: boolean;
  // 是否是根，包括页面的根，tab组件中的根容器
  // isRoot = true 表示不可拖拽、缩放
  isRoot?: boolean;
  children: IComponent[];
}
export class CommonContainer extends Component implements ICommonContainer {
  isContainer = true;
  children: IComponent[] = [];
  constructor(props?: ICommonContainer) {
    super(props);
    fastInitProps(props, this);
  }
}
