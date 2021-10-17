<template>
  <div class="products">
    <ProductList :productsPage="productsPage" :page="page" />
  </div>
</template>

<script>
import ProductList from "@/components/products/ProductList.vue";
import store from "@/store/index";

function getPageProducts(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("product/getProducts", {
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    ProductList,
  },
  data() {
    return {
      productsPage: "products",
    };
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
