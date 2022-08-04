import { ComponentType } from '@/components/Editor/ComponentTypes';
import Tab, {
  getNewTabContainer,
  ITab,
} from '@/components/Editor/TrilateralComponents/Vant/Tab';
import { fastInitProps } from '@/util';

export default class Swiper extends Tab {
  type = ComponentType.Swiper;
  active = 0;
  width = '';
  height = 200;
  children = [getNewTabContainer('轮播1'), getNewTabContainer('轮播2')];

  constructor(props?: ITab) {
    super(props);
    fastInitProps(props, this);
  }
}
