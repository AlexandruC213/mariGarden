<template>
  <div class="products">
    <h1>Products</h1>
    <div class="container-page">
      <div class="options-container">
        <SortProducts
          :coppyProducts="coppyProducts"
          @sort-products="setSortedProducts"
        />
        <FilterProducts
          class="filterProducts"
          filterTitle="price"
          :coppyProducts="coppyProducts"
          :filterOptions="filterOptionsPrice"
          @filter-products="setSortedProducts"
        />
      </div>
      <div class="products-container">
        <ProductItem
          class="product-item"
          v-for="product in checkProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SortProducts from "@/components/products/SortProducts.vue";
import FilterProducts from "@/components/products/FilterProducts.vue";
import ProductItem from "@/components/products/ProductItem.vue";
import { mapState } from "vuex";
import store from "@/store/index";

export default {
  components: {
    ProductItem,
    SortProducts,
    FilterProducts,
  },
  data() {
    return {
      newProducts: [],
      coppyProducts: [],
      filterOptionsPrice: ["5.00 - 9.99", "10.00 - 14.99", "15.00 - 19.99"],
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch("product/getProducts").then(() => {
      next();
    });
  },
  computed: {
    checkProducts() {
      return !this.newProducts.length ? this.coppyProducts : this.newProducts;
    },
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  methods: {
    setSortedProducts(sortedProducts) {
      this.newProducts = sortedProducts;
    },
  },
  created() {
    this.coppyProducts = [...this.products];
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container-page {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
}

.products-container {
  width: 75%;
  margin-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
}

.products-container .product-item {
  margin-right: 50px;
}

.options-container {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}

.filterProducts {
  margin-top: 100px;
}
</style>
