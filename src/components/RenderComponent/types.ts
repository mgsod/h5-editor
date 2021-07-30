import { IComponent } from "./Component";
import { IContainer } from "./Container";
import { IImg } from "@/components/RenderComponent/Img";

export enum ComponentType {
  Base = "Base",
  Container = "Container",
  Img = "Img",
  Button = "Button",
}
export interface IComponentItem {
  type: ComponentType;
  icon: string;
  name: string;
}
export const ComponentList: IComponentItem[] = [
  { type: ComponentType.Container, icon: "xxx", name: "容器" },
  { type: ComponentType.Img, icon: "xxx", name: "图片" },
  { type: ComponentType.Button, icon: "xxx", name: "按钮" },
];

export interface TypeMapping {
  [ComponentType.Base]: Partial<IComponent>;
  [ComponentType.Container]: Partial<IContainer>;
  [ComponentType.Img]: Partial<IImg>;
  [ComponentType.Button]: Partial<IContainer>;
}

export type TComponent = IComponent & IContainer & IImg;
export type ALlComponent =
  | Partial<IComponent>
  | Partial<IContainer>
  | Partial<IImg>;
