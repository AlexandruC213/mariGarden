<template>
  <div class="products">
    <ProductList :productsPage="productsPage" :page="lastLoadedPage" />
  </div>
</template>

<script>
import ProductList from "@/components/products/ProductList.vue";
import { mapState } from "vuex";
import store from "@/store/index";

function getPageProducts(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store.dispatch("product/getProducts").then(() => {
    routeTo.params.page = currentPage;
    store.dispatch("product/setPage", currentPage);
    next();
  });
}

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      productsPage: "products",
    };
  },
  computed: {
    ...mapState({
      lastLoadedPage: (state) => state.product.lastLoadedPage,
    }),
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageProducts(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageProducts(routeTo, next);
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin-top: 50px;
}
</style>
