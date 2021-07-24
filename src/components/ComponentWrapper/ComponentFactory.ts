import BaseComponent from "@/components/ComponentWrapper/BaseComponent";
import { IComponent, IContainer } from "@/components/ComponentWrapper/types";
import Container from "@/components/ComponentWrapper/Container";

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export enum ComponentType {
  Base = "Base",
  Container = "Container",
}

interface TypeMapping {
  [ComponentType.Base]: Optional<IComponent, "position">;
  [ComponentType.Container]: Optional<
    IContainer,
    "isContainer" | "children" | "position"
  >;
}

/**
 *构造组件的工厂函数
 */
export default class ComponentFactory {
  static createComponent<T extends keyof TypeMapping>(
    type: T,
    // 通过传入的type映射作component的类型推断
    component: TypeMapping[T]
  ): IComponent | undefined {
    switch (type) {
      case ComponentType.Base:
        return new BaseComponent(<IComponent>component);
      case ComponentType.Container:
        return new Container(<IContainer>component);
    }
  }
}
