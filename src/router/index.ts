import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Index from "../pages/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/editor",
    name: "editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../pages/Editor/index.vue"),
  },
  {
    path: "/preview",
    name: "preview",
    component: () =>
      import(/* webpackChunkName: "preview" */ "../pages/Preview/index.vue"),
  },
  {
    path: "/document",
    name: "document",
    component: () =>
      import(/* webpackChunkName: "document" */ "../pages/Document/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
