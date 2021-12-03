import Container, {
  IContainer,
} from "@/components/Editor/RenderComponent/Container";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { fastInitProps } from "@/util";
import {
  CommonContainer,
  ICommonContainer,
} from "@/components/Editor/RenderComponent/CommonInterface/Container";

export interface ITab extends ICommonContainer {
  active: number;
  children: IContainer[];
}
export default class Tab extends CommonContainer implements ITab {
  type = ComponentType.Tab;
  children = [
    new Container({ isRoot: true, width: "", height: "", alias: "标签1" }),
    new Container({ isRoot: true, width: "", height: "", alias: "标签2" }),
  ];
  active = 0;
  constructor(props?: ITab) {
    super(props);
    fastInitProps(props, this);
  }
}
