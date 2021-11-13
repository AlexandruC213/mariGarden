<template>
  <div class="container-filter">
    <h4>{{ capitalizeTitle }}</h4>
    <div>
      <div v-for="option in filterOptions" :key="option">
        <input
          type="radio"
          :id="option"
          :value="option"
          v-model="checkedOption"
          @change="filteredProducts"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";

export default {
  props: {
    filterTitle: {
      type: String,
      required: true,
    },
    filterOptions: {
      type: Array,
      required: true,
    },
    coppyProducts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkedOption: "",
      finalProducts: [],
    };
  },
  computed: {
    capitalizeTitle() {
      return (
        this.filterTitle.charAt(0).toUpperCase() + this.filterTitle.slice(1)
      );
    },
  },
  methods: {
    filteredProducts() {
      const convertedOptions = this.checkedOption.split("-");

      this.finalProducts = this.coppyProducts.filter(
        (product) =>
          product[this.filterTitle] >= convertedOptions[0] &&
          product[this.filterTitle] <= convertedOptions[1]
      );

      this.$emit("filter-products", this.finalProducts);
    },
  },
  created() {
    eventBus.$on("reset-value", () => {
      this.checkedOption = "";
    });
  },
};
</script>

<style scoped>
h4 {
  padding-bottom: 15px;
}

input {
  margin: 0 10px 10px 0;
}

input,
label {
  cursor: pointer;
}

.container-filter {
  width: 55%;
}
</style>
