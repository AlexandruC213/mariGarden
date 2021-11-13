<template>
  <div class="products">
    <h1>Products</h1>
    <transition appear :css="false" @before-enter="beforeEnter" @enter="enter">
      <div class="products-container">
        <ProductItem
          v-for="product in currentProductsOnPage"
          :key="product.id"
          :product="product"
        />
      </div>
    </transition>
    <Pagination :perPage="perPage" class="pagination" />
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import ProductItem from "@/components/products/ProductItem.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { mapState } from "vuex";

export default {
  props: {
    animationType: {
      type: String,
    },
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
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      Velocity(
        el,
        { opacity: 1, translateX: [0, this.animationType] },
        { duration: 1000, easing: "easeInOutCubic", complete: done }
      );
    },
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
