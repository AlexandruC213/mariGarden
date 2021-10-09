<template>
  <div class="pagination-container">
    <template v-if="page > 1">
      <Links :productsPage="productsPage" :page="page" :sign="prevPageSign"
        ><i class="fas fa-arrow-left"></i
      ></Links>
    </template>

    <Links
      :productsPage="productsPage"
      v-for="page in numberOfPages"
      :key="page"
      :page="page"
      >{{ page }}</Links
    >

    <template v-if="lastPage">
      <Links
        :productsPage="productsPage"
        :page="page"
        :sign="nextPageSign"
        :lastPage="lastPage"
        ><i class="fas fa-arrow-right"></i
      ></Links>
    </template>
  </div>
</template>

<script>
import Links from "@/components/Links.vue";
import { mapState } from "vuex";

export default {
  props: {
    page: Number,
    perPage: Number,
    productsPage: String,
  },
  components: {
    Links,
  },
  data() {
    return {
      nextPageSign: "+",
      prevPageSign: "-",
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.numberProduct / this.perPage);
    },
    lastPage() {
      return this.numberProduct > this.page * this.perPage;
    },
    ...mapState({
      numberProduct: (state) => state.product.numberOfProducts,
    }),
  },
};
</script>

<style scoped>
.pagination-container {
  height: 100px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
