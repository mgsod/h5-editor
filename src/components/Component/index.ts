import { Position } from "@/components/Layout";

export interface IComponent {
  id: string;
  width: number;
  height: number;
  position: Position;
}

/**
 *基础组件类，包含一个组件最基本的信息
 */
class Component implements IComponent {
  id: string;
  width: number;
  height: number;
  position: Position;
  constructor({ id, width, height, position = "relative" }: IComponent) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.position = position;
  }
}

export default Component;
