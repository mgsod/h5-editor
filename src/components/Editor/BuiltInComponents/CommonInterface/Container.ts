/**
 * 继承于基础组件的容器组件基类
 */
import Component, {
  IComponent,
} from '@/components/Editor/BuiltInComponents/Component';
import { fastInitProps } from '@/util';
import { PartOfComponent } from '@/components/Editor/ComponentTypes';
import { FLEX_DIRECTION } from '@/components/Editor/BuiltInComponents/Container';

export interface ICommonContainer extends IComponent {
  isContainer: boolean;
  // 是否是根，包括页面的根，tab组件中的根容器
  // isRoot = true 表示不可拖拽、缩放
  isRoot?: boolean;
  children: PartOfComponent[];
  direction: FLEX_DIRECTION;
}

export abstract class CommonContainer
  extends Component
  implements ICommonContainer
{
  isContainer = true;
  children: PartOfComponent[] = [];
  direction: FLEX_DIRECTION = FLEX_DIRECTION.ROW;

  protected constructor(props?: ICommonContainer) {
    super(props);
    fastInitProps(props, this);
  }
}
