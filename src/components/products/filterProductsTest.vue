<template>
  <div class="container-filter">
    <h4>{{ capitalizeTitle }}</h4>
    <div class="container-sort">
      <div v-for="option in filterOptions" :key="option">
        <input
          type="radio"
          :id="option"
          :value="option"
          v-model="checkedOptions"
          @change="filteredProducts"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  },
  data() {
    return {
      checkedOptions: [],
      convertedOptions: [],
      sortedProducts: [],
    };
  },
  computed: {
    capitalizeTitle() {
      return (
        this.filterTitle.charAt(0).toUpperCase() + this.filterTitle.slice(1)
      );
    },
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  methods: {
    filteredProducts() {
      //   const convertedOptions = this.checkedOptions.join("-").split("-");
      //   console.log("New value checked");
      //   for (let i = 0; i < convertedOptions.length; i++) {
      //     console.log(convertedOptions[i]);
      //   }
      //   const convertOptionsToNum = convertedOptions.map((el) => {
      //     return parseFloat(el);
      //   });
      //   let first = convertedOptions[convertedOptions.length - 2];
      //   let second = convertedOptions[convertedOptions.length - 1];
      //   const test = convertedOptions.map((el) => {
      //     console.log(el);
      //     // first = el[0];
      //     // second = el[1];
      //     // return first, second;
      //   });
      //   console.log(first);
      //   console.log(second);
      //   console.log("Converted options to numbers");
      //   console.log(test);
      //   const lowestNum = Math.min(...convertOptionsToNum);
      //   const highestNum = Math.max(...convertOptionsToNum);
      //   this.sortedProducts = this.sortedProducts.
      // const finalProducts = this.sortedProducts.filter(
      //   (product) =>
      //     product[this.filterTitle] >= first &&
      //     product[this.filterTitle] <= second
      // );
      //   console.log("cel mai mic elemnt");
      //   console.log(lowestNum);
      //   console.log("cel mai mare elemnt");
      //   console.log(highestNum);
      // console.log("Converted options");
      // console.log(convertedOptions);
      // console.log("Products Sorted");
      // console.log(finalProducts);
      //   console.log("coppy options");
      //   console.log(CoppyOfCheckedOptions);
      //   console.log("options");
      //   console.log(this.checkedOptions);
    },
  },

  created() {
    this.sortedProducts = [...this.products];
    // console.log(parseInt(this.filterOptions));
    // this.convertOptions();
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
  width: 80%;
  border: 1px solid red;
}

.container-sort {
  border: 2px solid black;
}
</style>
