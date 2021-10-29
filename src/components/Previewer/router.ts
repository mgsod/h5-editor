import { v4 as uuidv4 } from "uuid";
import { IPage } from "@/store/Editor";
type RouterMode = "query" | "hash";
export class Router {
  routes: IPage[] = [];
  from: IPage | null = null;
  routerKey: string;
  current: IPage | null = null;
  mode: RouterMode;
  constructor(
    routes: IPage[],
    routerKey: string = uuidv4(),
    mode: RouterMode = "query"
  ) {
    this.routerKey = routerKey;
    this.routes = routes;
    this.mode = mode;
  }
  getRouteId() {
    const search = window.location.search;
    const reg = new RegExp(`(?<=${this.routerKey}=)[^&/]*`);
    const routerMatch = search.match(reg);
    if (routerMatch) return routerMatch[0];
    throw new Error(
      `h5-previewer路由参数不正确，请检查url地址中是否有'${this.routerKey}'参数`
    );
  }
  getRouteComponents() {
    const routerId = this.getRouteId() || (this.routes[0] as IPage).id;
    const page = (this.routes as IPage[]).find((page) => page.id === routerId);
    if (page) {
      this.from = this.current;
      this.current = page;
      return page.components;
    }
    return [];
  }
}
