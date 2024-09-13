import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Launch/index.vue"),
    meta: {
      title: "redict",
    },
  },
  {
    path: "/video",
    component: () => import("./pages/Video/index.vue"),
    meta: {
      title: "Notice",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = to.meta.title
  next();
});

export default router;
