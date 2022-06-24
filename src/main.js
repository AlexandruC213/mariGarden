import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "nprogress/nprogress.css";
import RatingFilter from "./filters/rating";

Vue.filter("rating", RatingFilter);

Vue.config.productionTip = false;

const requireComponent = require.context(
  "./components/globalComponents",
  true,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
