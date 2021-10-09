<template>
  <div class="products">
    <ProductList :productsPage="productsPage" />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      productsPage: "products",
    };
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin-top: 50px;
}
</style>
