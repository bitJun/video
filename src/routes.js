import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Launch/index.vue"),
    meta: {
      title: "card",
    },
  },
  {
    path: "/video",
    component: () => import("./pages/Video/index.vue"),
    meta: {
      title: "video",
    },
  },
  {
    path: "/card",
    component: () => import("./pages/Card/index.vue"),
    meta: {
      title: "Card",
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
