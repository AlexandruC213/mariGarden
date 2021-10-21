import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/Products.vue"),
  },
  {
    path: "/details/:id",
    name: "details",
    component: () => import("../views/ProductDetails.vue"),
    props: true,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/reviews",
    name: "reviews",
    component: () => import("../views/Reviews.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/errors/NotFound.vue"),
    props: true,
  },
  {
    path: "/network-issue",
    name: "networkIssue",
    component: () => import("../views/errors/NetworkIssue.vue"),
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = new VueRouter({
  mode: "history",
  // scrollBehavior() {
  //   return { x: 0, y: 0 };
  // },
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
