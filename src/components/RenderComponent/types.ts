import { IComponent } from "./Component";
import { IContainer } from "./Container";

export enum ComponentType {
  Base = "Base",
  Container = "Container",
  Img = "Img",
  Button = "Button",
}

export interface TypeMapping {
  [ComponentType.Base]: Partial<IComponent>;
  [ComponentType.Container]: Partial<IContainer>;
  [ComponentType.Container]: Partial<IContainer>;
  [ComponentType.Container]: Partial<IContainer>;
}

export type TComponent = IComponent & IContainer;
