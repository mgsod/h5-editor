import { Position } from "@/components/Editor/RenderComponent/Layout";
import { BorderStyle } from "@/components/Editor/RenderComponent/Layout";
import { v4 as uuidv4 } from "uuid";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { IEvent } from "@/components/Editor/event";
export interface IBackground {
  color?: string;
  img?: string;
}
export interface IAroundValue {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
export interface IComponent {
  type: ComponentType;
  id: string;
  width: number | "";
  height: number | "";
  position: Position;
  background: IBackground;
  parentId?: string;
  alias?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  padding?: IAroundValue;
  margin?: IAroundValue;
  border?: IAroundValue;
  borderStyle?: BorderStyle;
  borderColor?: string;
  borderRadius?: string;
  events?: IEvent[];
}

/**
 *基础组件类，包含一个组件最基本的信息
 */
class Component implements IComponent {
  type = ComponentType.Base;
  id: string;
  width = 50;
  height = 50;
  position: Position = "static";
  alias?: string = "";
  borderRadius?: string = "0,0,0,0";
  borderStyle: BorderStyle = "solid";
  background: IBackground = { color: "", img: "" };
  constructor(props?: Partial<IComponent>) {
    this.id = uuidv4();
    this.alias = props?.type;
    fastInitProps(props, this);
  }
}

export default Component;
