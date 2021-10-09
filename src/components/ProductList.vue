<template>
  <div class="products">
    <h1>Products</h1>
    <div class="products-container">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <Pagination
      :productsPage="productsPage"
      :page="page"
      :perPage="perPage"
      class="pagination"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ProductItem,
    Pagination,
  },
  props: {
    productsPage: String,
  },
  data() {
    return {
      perPage: 4,
    };
  },
  methods: mapActions("product", ["getProducts"]),
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  created() {
    this.getProducts({
      perPage: this.perPage,
      page: this.page,
    });
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
