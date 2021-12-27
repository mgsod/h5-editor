import { ref, Ref } from "vue";
type RouterMode = "query" | "hash";
type PageActionType = "prev" | "next";
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
  // 路由参数标识符 key=xxxxxxx
  static key = "";
  static mode: RouterMode = "hash";
  // 路由表
  private routes: IRoute[];
  // 路由模式，hash或query。
  private readonly mode: RouterMode;
  private routerKey = "";
  // 上个路由
  from: IRoute | null = null;
  // 当前路由
  current: IRoute | null = null;
  // 匹配路由的正则
  private reg: RegExp;
  // 默认首页
  private readonly homePage?: string;
  // 当前路由对应渲染的组件列表
  renderComponents: Ref<any[]> = ref([]);
  history: IRoute[] = [];
  onChange: (router: Router) => void = () => {};
  constructor({
    routes = [],
    mode = "hash",
    homePage = "",
    routerKey = "hpath",
  }: IRouter) {
    Router.key = routerKey;
    Router.mode = mode;

    this.routes = routes;
    this.routerKey = routerKey;
    this.mode = mode;
    this.homePage = homePage;

    this.reg = Router.generateRouterKeyReg();

    // 如果是hash模式，需要监听hashchange事件
    if (mode === "hash") {
      window.addEventListener("hashchange", () => {
        this.renderComponents.value = this.getRouteComponents();
        if (this.onChange) {
          this.onChange(this);
        }
      });
    }

    // 如果有首页，设置首页
    if (this.homePage) {
      Router.go(this.homePage);
    } else {
      // 如果没有path参数
      if (!this.getRouteId()) {
        const homePage = this.routes[0].id;
        Router.go(homePage);
      }
    }
    this.renderComponents.value = this.getRouteComponents();
  }

  // 通过routerKey构建用来获取path的的正则表达式
  static generateRouterKeyReg(): RegExp {
    return new RegExp(`${this.key}=([^&/]*)`);
  }

  /**
   * 路由跳转
   * @param routerId
   */
  static go(routerId: string) {
    const mode = this.mode;
    mode === "query"
      ? this.setPathByQuery(routerId)
      : this.setPathByHash(routerId);
  }
  /**
   * 通过hash获取路由id
   * @private
   */
  private static getRouteIdByHash() {
    const hash = window.location.hash;
    return this.getRoureIdByQuery(hash);
  }
  /**
   * 通过query获取路由id
   * @private
   */
  private static getRoureIdByQuery(search = window.location.search) {
    const routerMatch = search.match(this.generateRouterKeyReg());
    if (routerMatch) return routerMatch[1];
  }

  /**
   * 通过query设置path
   * @param routeId
   * @private
   */
  private static setPathByQuery(routeId: string) {
    let query = location.search;
    const routerKey = this.key;
    const reg = this.generateRouterKeyReg();
    if (!query) {
      query = `?${routerKey}=${routeId}`;
    } else {
      const hasPath = query.match(reg);
      if (hasPath) {
        query = query.replace(reg, `${routerKey}=${routeId}`);
      } else {
        query += `&${routerKey}=${routeId}`;
      }
    }
    location.search = query;
  }
  /**
   * 通过hash设置path
   * @param routeId
   * @private
   */
  private static setPathByHash(routeId: string) {
    let hash = location.hash;
    // 获取routerKey
    const routerKey = this.key;
    const reg = this.generateRouterKeyReg();
    const hasPath = hash.match(reg);
    if (!hasPath) {
      hash += `?${routerKey}=${routeId}`;
    } else {
      hash = hash.replace(reg, `${routerKey}=${routeId}`);
    }
    location.hash = hash;
  }

  /**
   * 设置路由
   * @param param 路由id或者翻页动作
   */
  setPath(param: string | PageActionType) {
    let index = this.routes.findIndex((item) => item.id === this.current?.id);
    index = index < 0 ? 0 : index;
    let routerId = "";
    // 如果是翻页
    if (param === "next" || param === "prev") {
      if (param === "prev") {
        index--;
        index = index < 0 ? 0 : index;
      }
      if (param === "next") {
        index++;
        index = index > this.routes.length - 1 ? this.routes.length - 1 : index;
      }
      routerId = this.routes[index].id;
    } else {
      routerId = param;
    }
    Router.go(routerId);
  }

  /**
   * 跳转到指定步数，同vue-router go
   * @param step
   */
  go(step: number) {
    step = this.history.length - (1 - step);
    step = step < 0 ? 0 : step;
    const page = this.history[step];
    Router.go(page.id);
  }
  /**
   * 获取路由id
   */
  getRouteId() {
    if (this.mode === "query") return Router.getRoureIdByQuery();
    return Router.getRouteIdByHash();
  }

  /**
   * 获取当前路由下的组件
   */
  getRouteComponents() {
    const routerId = this.getRouteId() || (this.routes[0] as IRoute).id;
    const page = (this.routes as IRoute[]).find((page) => page.id === routerId);
    if (page) {
      this.from = this.current;
      this.current = page;
      this.history.push(this.current);
      return page.components;
    }
    return [];
  }
}
