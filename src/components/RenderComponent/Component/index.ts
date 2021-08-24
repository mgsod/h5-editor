import { Position } from "@/components/RenderComponent/Layout";
import { v4 as uuidv4 } from "uuid";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/RenderComponent/types";
export interface IComponent {
  type: ComponentType;
  id: string;
  width: number;
  height: number;
  position: Position;
  alias?: string;
}

/**
 *基础组件类，包含一个组件最基本的信息
 */
class Component implements IComponent {
  type = ComponentType.Base;
  id: string;
  width = 50;
  height = 50;
  position: Position = "relative";
  alias?: string = "";
  constructor(props?: IComponent) {
    this.id = uuidv4();
    this.alias = props?.type;
    fastInitProps(props, this);
  }
}

export default Component;
