<template>
  <div class="products">
    <h1>Products</h1>
    <div class="products-container">
      <ProductItem
        v-for="product in currentProductsOnPage"
        :key="product.id"
        :product="product"
      />
    </div>
    <Pagination
      :productsPage="productsPage"
      :perPage="perPage"
      class="pagination"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/products/ProductItem.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { mapState } from "vuex";

export default {
  props: {
    productsPage: String,
  },
  data() {
    return {
      currentProductsOnPage: [],
      perPage: 4,
    };
  },
  components: {
    ProductItem,
    Pagination,
  },
  computed: {
    ...mapState({
      products: (state) => state.product.products,
      currentPage: (state) => state.product.lastLoadedPage,
    }),
  },
  created() {
    const start = this.perPage * (this.currentPage - 1);
    const end = this.perPage * this.currentPage;
    this.currentProductsOnPage = this.products.slice(start, end);
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin-bottom: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.products h1 {
  font-size: 2.5rem;
  margin-top: 50px;
}

.products-container {
  width: 90%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
