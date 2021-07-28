import Component, { IComponent } from "@/components/RenderComponent/Component";
import Container, { IContainer } from "@/components/RenderComponent/Container";
import { ComponentType, TypeMapping } from "./types";

/**
 *构造组件的工厂函数
 */
export default class ComponentFactory {
  static createComponent<T extends keyof TypeMapping>(
    type: T,
    // 通过传入的type映射作component的类型推断
    component?: TypeMapping[T]
  ): IComponent | undefined {
    switch (type) {
      case ComponentType.Base:
        return new Component(<IComponent>component);
      case ComponentType.Container:
        return new Container(<IContainer>component);
    }
  }
}
