<template>
  <div class="products">
    <h1>Products</h1>
    <div class="products-container">
      <ProductItem v-for="prod in products" :key="prod.id" :prod="prod" />
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import EventServices from "@/services/EventServices.js";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    EventServices.getProducts()
      .then((response) => (this.products = response.data))
      .catch((error) => "There was an error: " + error.response);
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin-bottom: 200px;

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
</style>
