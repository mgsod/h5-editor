import Component, {
  IComponent,
} from '@/components/Editor/BuiltInComponents/Component';
import Container, {
  IContainer,
} from '@/components/Editor/BuiltInComponents/Container';
import { ComponentType, PartOfComponent } from './ComponentTypes';
import Img, { IImg } from '@/components/Editor/BuiltInComponents/Img';
import Text, { IText } from '@/components/Editor/BuiltInComponents/Text';
import Tab, { ITab } from '@/components/Editor/TrilateralComponents/Vant/Tab';
import Button, { IButton } from '@/components/Editor/BuiltInComponents/Button';
import NoticeBar, {
  INoticeBar,
} from '@/components/Editor/TrilateralComponents/Vant/NoticeBar/index';
import Swiper from '@/components/Editor/TrilateralComponents/Vant/Swiper';
import NavBar, {
  INavBar,
} from '@/components/Editor/TrilateralComponents/Vant/NavBar';

/**
 *构造组件的工厂函数
 */
export default class ComponentFactory {
  static createComponent(
    type: ComponentType,
    // 通过传入的type映射作component的类型推断
    component?: Partial<PartOfComponent>
  ): IComponent {
    switch (type) {
      case ComponentType.Container:
        return new Container(<IContainer>component);
      case ComponentType.Img:
        return new Img(<IImg>component);
      case ComponentType.Text:
        return new Text(<IText>component);
      case ComponentType.Tab:
        return new Tab(<ITab>component);
      case ComponentType.Button:
        return new Button(<IButton>component);
      case ComponentType.NoticeBar:
        return new NoticeBar(<INoticeBar>component);
      case ComponentType.Swiper:
        return new Swiper(<ITab>component);
      case ComponentType.NavBar:
        return new NavBar(<INavBar>component);
    }
  }
}
