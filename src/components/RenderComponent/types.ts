import { IComponent } from "./Component";
import { IContainer } from "./Container";
import { IImg } from "@/components/RenderComponent/Img";

// 所有组件类型及名称
export enum ComponentType {
  Base = "Base",
  Container = "HContainer",
  Img = "HImg",
  Text = "HText",
}
export enum ComponentSettingType {
  Base = "BaseSetting",
  Container = "ContainerSetting",
  Img = `ImgSetting`,
}
// 用于侧边栏组件列表中单个组件的接口
export interface IComponentItem {
  type: ComponentType;
  icon: string;
  name: string;
}
// 侧边栏组件列表
export const ComponentList: IComponentItem[] = [
  { type: ComponentType.Container, icon: "xxx", name: "容器" },
  { type: ComponentType.Img, icon: "xxx", name: "图片" },
  { type: ComponentType.Text, icon: "xxx", name: "文本" },
];

export type TComponent = IComponent & IContainer & IImg;
export type propKeys = keyof TComponent;
export type ALlComponent =
  | Partial<IComponent>
  | Partial<IContainer>
  | Partial<IImg>;
