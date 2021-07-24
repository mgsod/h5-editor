import { IComponent } from "@/components/ComponentWrapper/types";
import { Position } from "@/components/ComponentWrapper/Layout";

/**
 *基础组件类，包含一个组件最基本的信息
 */
class BaseComponent implements IComponent {
  id: string;
  width: number;
  height: number;
  position: Position;
  constructor({ id, width, height, position = Position.Relative }: IComponent) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.position = position;
  }
}

export default BaseComponent;
