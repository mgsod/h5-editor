import Component from "@/components/ComponentWrapper/BaseComponent";

export interface IPage {
  id: string;
  order: number;
  components: Component[];
}
