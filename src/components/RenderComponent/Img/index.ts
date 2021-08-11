import Component, { IComponent } from "@/components/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/RenderComponent/types";
export type objectFit = "cover" | "contain";
export interface IImg extends IComponent {
  src: string;
  objectFit: objectFit;
}

export default class Img extends Component implements IImg {
  type = ComponentType.Img;
  objectFit: objectFit = "cover";
  src = "http://10.0.218.44:8080/index/images/login.png";
  width = 70;
  height = 70;
  constructor(props: IImg) {
    super(props);
    fastInitProps(props, this);
  }
}
