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
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-09%2F5a54397bf0512.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642234674&t=38100f2faabb0ecc91c226718de13632";
  width = "";
  height = 100;
  constructor(props: IImg) {
    super(props);
    fastInitProps(props, this);
  }
}
