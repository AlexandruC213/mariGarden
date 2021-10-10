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
    props: true,
  },
  {
    path: "/details/:id",
    name: "details",
    component: () => import("../views/ProductDetails.vue"),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("product/getProduct", routeTo.params.id)
        .then((product) => {
          routeTo.params.product = product;
          next();
        });
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/Checkout.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
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
