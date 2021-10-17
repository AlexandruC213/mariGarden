import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cart from "@/components/cart/Cart.vue";
import "nprogress/nprogress.css";

Vue.component("Cart", Cart);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
