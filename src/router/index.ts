import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../pages/index.vue"),
    children: [
      {
        path: "documents",
        name: "documents",
        component: () =>
          import(
            /* webpackChunkName: "documents" */ "../pages/Documents/index.vue"
          ),
      },
      {
        path: "components",
        name: "components",
        component: () =>
          import(
            /* webpackChunkName: "components" */ "../pages/Components/index.vue"
          ),
      },
    ],
  },
  {
    path: "/editor",
    name: "editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../pages/Editor/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
