import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue"),
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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
