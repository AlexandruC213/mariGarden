<template>
  <div class="products">
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
};
</script>

<style scoped>
.products {
  width: 100%;
  margin-top: 50px;
}
</style>
