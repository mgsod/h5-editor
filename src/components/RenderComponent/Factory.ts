import Component, { IComponent } from "@/components/RenderComponent/Component";
import Container, { IContainer } from "@/components/RenderComponent/Container";
import { ALlComponent, ComponentType, TypeMapping } from "./types";
import Img, { IImg } from "@/components/RenderComponent/Img";

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
      case ComponentType.Button:
        return new Img(<IImg>component);
    }
  }
}
