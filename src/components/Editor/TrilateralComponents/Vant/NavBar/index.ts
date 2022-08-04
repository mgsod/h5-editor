import Component, {
  IComponent,
} from '@/components/Editor/BuiltInComponents/Component';
import { fastInitProps } from '@/util';
import { ComponentType } from '@/components/Editor/ComponentTypes';
import { Position } from '@/components/Editor/BuiltInComponents/Layout';
import { ICommonText } from '@/components/Editor/BuiltInComponents/CommonInterface/Text';

export interface INavBar extends IComponent, Pick<ICommonText, 'color'> {
  title: string;
  showBack: boolean;
  showBottomLine: boolean;
  fullScreen: boolean;
}

export default class NavBar extends Component implements INavBar {
  type = ComponentType.NavBar;
  title = '标题';
  width = 375;
  height = 46;
  top = 0;
  left = 0;
  showBack = true;
  showBottomLine = true;
  position: Position = 'absolute';
  color = '#000';
  fullScreen = false;

  constructor(props: INavBar) {
    super(props);
    fastInitProps(props, this);
  }
}
