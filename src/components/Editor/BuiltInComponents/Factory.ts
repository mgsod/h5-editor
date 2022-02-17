import Component, {
  IComponent,
} from "@/components/Editor/BuiltInComponents/Component";
import Container, {
  IContainer,
} from "@/components/Editor/BuiltInComponents/Container";
import { ComponentType, PartOfComponent } from "./types";
import Img, { IImg } from "@/components/Editor/BuiltInComponents/Img";
import Text, { IText } from "@/components/Editor/BuiltInComponents/Text";
import Tab, { ITab } from "@/components/Editor/BuiltInComponents/Tab";
import Button, { IButton } from "@/components/Editor/BuiltInComponents/Button";
import NoticeBar, {
  INoticeBar,
} from "@/components/Editor/TrilateralComponents/Vant/NoticeBar";

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
      case ComponentType.Base:
        return new Component(<IComponent>component);
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
    }
  }
}
