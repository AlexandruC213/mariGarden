<template>
  <div class="pagination-container">
    <router-link
      :to="{ name: checkPage, query: { page: this.page - 1 } }"
      rel="prev"
      tag="button"
      :disabled="disabledPrev"
      v-if="numberOfPages != 0"
      ><i class="fas fa-arrow-left"></i
    ></router-link>

    <PageLinks
      v-for="page in numberOfPages"
      :key="page"
      :page="page"
      :checkPage="checkPage"
      >{{ page }}</PageLinks
    >

    <router-link
      :to="{ name: checkPage, query: { page: this.page + 1 } }"
      rel="next"
      tag="button"
      :disabled="disabledNext"
      v-if="numberOfPages != 0"
      ><i class="fas fa-arrow-right"></i
    ></router-link>
  </div>
</template>

<script>
import PageLinks from "@/components/PageLinks.vue";
import { mapState } from "vuex";

export default {
  props: {
    page: Number,
    perPage: Number,
    productsPage: String,
  },
  components: {
    PageLinks,
  },
  computed: {
    disabledPrev() {
      return this.page == 1;
    },
    disabledNext() {
      return !this.lastPage;
    },
    checkPage() {
      return this.productsPage === "products" ? this.productsPage : "home";
    },
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

.pagination-container a,
.pagination-container button {
  width: 50px;
  height: 50px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid black;
}

.pagination-container button {
  cursor: pointer;
}

.pagination-container button:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.pagination-container button:disabled {
  cursor: not-allowed;
}

.pagination-container a.router-link-exact-active {
  border-radius: 50%;
  background-color: var(--green);
  color: var(--white);
}
</style>
