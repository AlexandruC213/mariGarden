import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
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
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch("product/getProduct", routeTo.params.id).then(() => {
        next();
      });
    },
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
  scrollBehavior(routeTo) {
    if (routeTo.name === "details") {
      return { x: 0, y: 0 };
    }
    const key = Object.keys(routeTo.query);
    return key.length
      ? { selector: routeTo.query }
      : { x: 0, y: 0, behavior: "smooth" };
  },
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
