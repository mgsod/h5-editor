import Container, {
  IContainer,
} from "@/components/Editor/RenderComponent/Container";
import { ComponentType } from "@/components/Editor/RenderComponent/types";
import { fastInitProps } from "@/util";
import {
  CommonContainer,
  ICommonContainer,
} from "@/components/Editor/RenderComponent/CommonInterface/Container";
export const getNewTabContainer = (name = "新标签") => {
  return new Container({
    isRoot: true,
    width: "",
    height: "",
    alias: name,
  });
};
export interface ITab extends ICommonContainer {
  active: number;
  children: IContainer[];
}
export default class Tab extends CommonContainer implements ITab {
  type = ComponentType.Tab;
  width = "";
  height = 300;
  children = [getNewTabContainer("标签1"), getNewTabContainer("标签2")];
  active = 0;
  constructor(props?: ITab) {
    super(props);
    fastInitProps(props, this);
  }
}