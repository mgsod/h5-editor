import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
export type objectFit = "cover" | "contain";
export interface IImg extends IComponent {
  src?: string;
  objectFit: objectFit;
}

export default class Img extends Component implements IImg {
  type = ComponentType.Img;
  objectFit: objectFit = "cover";
  src?: string =
    "https://cn.bing.com/th?id=OHR.JaneAusten_ZH-CN2508681308_1920x1080.jpg&rf=LaDigue_1920x1080.jpg";
  width = 300;
  height = 200;
  constructor(props: IImg) {
    super(props);
    fastInitProps(props, this);
  }
}
