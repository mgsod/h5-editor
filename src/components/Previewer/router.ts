import { v4 as uuidv4 } from "uuid";
import { ref, Ref } from "vue";
type RouterMode = "query" | "hash";
export interface IRoute {
  components: [];
  id: string;
}
interface IRouter {
  routes: IRoute[];
  routerKey?: string;
  mode?: RouterMode;
  homePage?: string;
}
export class Router {
  // 路由表
  routes: IRoute[];
  // 路由key（用来标识这是当前类所属路由）
  routerKey: string = uuidv4();
  // 路由模式，hash或query。
  mode: RouterMode;
  // 上个路由
  from: IRoute | null = null;
  // 当前路由
  current: IRoute | null = null;
  // 匹配路由的正则
  reg: RegExp;
  // 路由change事件
  onChange: (page: IRoute) => void = () => {};
  // 默认首页
  homePage?: string;
  // 当前路由对应渲染的组件列表
  renderComponents: Ref<any[]> = ref([]);
  constructor({
    routes = [],
    routerKey = "hpath",
    mode = "hash",
    homePage = "",
  }: IRouter) {
    this.routes = routes;
    this.routerKey = routerKey;
    this.mode = mode;
    this.homePage = homePage;
    this.reg = new RegExp(`(?<=${this.routerKey}=)[^&/]*`);

    // 如果是hash模式，需要监听hashchange事件
    if (mode === "hash") {
      window.addEventListener("hashchange", () => {
        this.onChange(this.current as IRoute);
        this.renderComponents.value = this.getRouteComponents();
      });
    }
    // 如果没有path参数
    if (!this.getRouteId()) {
      const homePage = this.homePage ? this.homePage : this.routes[0].id;
      // 如果有首页，设置首页
      this.setPathByHash(homePage);
    }
    this.renderComponents.value = this.getRouteComponents();
  }
  getRouteId() {
    if (this.mode === "query") return this.getRoureIdByQuery();
    return this.getRouteIdByHash();
  }
  private getRouteIdByHash() {
    const hash = window.location.hash;
    return this.getRoureIdByQuery(hash);
  }
  private getRoureIdByQuery(search = window.location.search) {
    const routerMatch = search.match(this.reg);
    if (routerMatch) return routerMatch[0];
  }
  getRouteComponents() {
    const routerId = this.getRouteId() || (this.routes[0] as IRoute).id;
    const page = (this.routes as IRoute[]).find((page) => page.id === routerId);
    if (page) {
      this.from = this.current;
      this.current = page;
      return page.components;
    }
    return [];
  }
  setPath(flag: string) {
    let index = this.routes.findIndex((item) => item.id === this.current?.id);
    index = index < 0 ? 0 : index;
    if (flag === "prev") {
      index--;
      index = index < 0 ? 0 : index;
    } else {
      index++;
      index = index > this.routes.length - 1 ? this.routes.length - 1 : index;
    }
    const routerId = this.routes[index].id;
    this.setPathByHash(routerId);
  }
  setPathByQuery(routeId: string) {}
  setPathByHash(routeId: string) {
    let hash = location.hash;
    const hasPath = hash.match(this.reg);
    if (!hasPath) {
      hash += `?${this.routerKey}=${routeId}`;
    } else {
      hash = hash.replace(this.reg, routeId);
    }
    location.hash = hash;
  }
}
