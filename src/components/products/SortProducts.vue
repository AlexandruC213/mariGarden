<template>
  <div>
    <BaseSelect
      class="container-sort-products"
      label="Sort by "
      :options="options"
      :value="selectedOption"
      v-model="selectedOption"
      @change="sort"
    />
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";

export default {
  props: {
    coppyProducts: {
      type: Array,
    },
  },
  data() {
    return {
      options: [
        "Alphabetic: A to Z",
        "Alphabetic: Z to A",
        "Price: Low to High",
        "Price: High to Low",
      ],
      selectedOption: "",
    };
  },
  methods: {
    sort() {
      switch (this.selectedOption) {
        case "Alphabetic: A to Z":
          this.sortProducts("title", "ascending");
          break;
        case "Alphabetic: Z to A":
          this.sortProducts("title", "descending");
          break;
        case "Price: Low to High":
          this.sortProducts("price", "ascending");
          break;
        case "Price: High to Low":
          this.sortProducts("price", "descending");
          break;
      }
      this.$emit("sort-products", this.coppyProducts);
      eventBus.$emit("reset-value");
    },
    sortProducts(sortBy, sortType) {
      if (sortType === "ascending") {
        this.coppyProducts.sort((a, b) =>
          a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
        );
      } else if (sortType === "descending") {
        this.coppyProducts.sort((a, b) =>
          a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
        );
      }
    },
  },
};
</script>

<style scoped>
.container-sort-products {
  width: 100%;
}
</style>
