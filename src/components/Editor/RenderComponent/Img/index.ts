import Component, {
  IComponent,
} from "@/components/Editor/RenderComponent/Component";
import { fastInitProps } from "@/util";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
export type objectFit = "cover" | "contain";
export const objectFitList: { name: string; value: objectFit }[] = [
  { name: "覆盖", value: "cover" },
  { name: "包含", value: "contain" },
];
export interface IImg extends IComponent {
  src?: string;
  objectFit: objectFit;
}

export default class Img extends Component implements IImg {
  type = ComponentType.Img;
  objectFit: objectFit = "cover";
  src?: string =
    "https://cn.bing.com/th?id=OHR.BirnbeckPier_ZH-CN0177628993_1920x1080.jpg&rf=LaDigue_1920x1080.jpg";
  width = 200;
  height = 100;
  constructor(props: IImg) {
    super(props);
    fastInitProps(props, this);
  }
}
