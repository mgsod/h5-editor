import Component, { IComponent } from "@/components/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/RenderComponent/types";
export type objectFit = "cover" | "contain";
export interface IImg extends IComponent {
  src?: string;
  objectFit: objectFit;
}

export default class Img extends Component implements IImg {
  type = ComponentType.Img;
  objectFit: objectFit = "cover";
  src?: string =
    "https://cn.bing.com/th?id=OHR.UbehebeCrater_ZH-CN0157876978_1920x1080.jpg&rf=LaDigue_1920x1080.jpg";
  width = 300;
  height = 200;
  constructor(props: IImg) {
    super(props);
    fastInitProps(props, this);
  }
}
