<template>
  <div class="products">
    <transition name="slide-down" appear>
      <h1>Products</h1>
    </transition>
    <div class="container-page">
      <transition name="slide-left" appear>
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
      </transition>
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
import gsap from "gsap";

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
    setAnimation(from) {
      gsap.from(".product-item", {
        duration: 0.5,
        opacity: 0,
        scale: 1.5,
        y: 150,
        x: -150,
        ease: "power2",
        stagger: {
          each: 0.1,
          from: from,
        },
      });
    },
  },
  created() {
    this.coppyProducts = [...this.products];
  },
  mounted() {
    this.setAnimation("random");
  },
  updated() {
    this.setAnimation("");
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

/*** Animations ***/

.r-down-enter {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-enter-active {
  transition: all 1s ease;
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-enter-active {
  transition: all 1s ease;
}
</style>
