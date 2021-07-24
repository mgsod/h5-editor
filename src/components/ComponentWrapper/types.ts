import { Layout, Position } from "@/components/ComponentWrapper/Layout";

export interface IComponent {
  id: string;
  width: number;
  height: number;
  position: Position;
}
export interface IContainer extends IComponent, Layout {
  isContainer: true;
  children: TComponent[];
}

export type TComponent = IComponent & IContainer;
