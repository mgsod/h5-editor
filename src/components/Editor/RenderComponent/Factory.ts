import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import Container, {
  IContainer,
} from "@/components/Editor/RenderComponent/Container";
import { ALlComponent, ComponentType } from "./types";
import Img, { IImg } from "@/components/Editor/RenderComponent/Img";
import Text, { IText } from "@/components/Editor/RenderComponent/Text";

/**
 *构造组件的工厂函数
 */
export default class ComponentFactory {
  static createComponent(
    type: ComponentType,
    // 通过传入的type映射作component的类型推断
    component?: ALlComponent
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
    }
  }
}
