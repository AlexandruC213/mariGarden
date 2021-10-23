<template>
  <div class="container-reviews">
    <div class="tabs">
      <span
        v-for="(tab, index) in tabs"
        :key="index"
        :class="currentActiveTab(tab)"
        @click="changeTab(tab)"
        >{{ tab }}</span
      >
    </div>

    <DisplayReviews
      v-show="displayTab('Reviews')"
      class="reviewsTab"
      :reviews="reviews"
    />

    <MakeReview v-show="displayTab('Make a Review')" class="makeReview" />
  </div>
</template>

<script>
import DisplayReviews from "@/components/reviews/DisplayReviews.vue";
import MakeReview from "@/components/reviews/MakeReview.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    DisplayReviews,
    MakeReview,
  },
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
  methods: {
    changeTab(currentTab) {
      this.selectedTab = currentTab;
    },
    displayTab(tab) {
      return this.selectedTab == tab;
    },
    currentActiveTab(currentTab) {
      return {
        active: this.selectedTab == currentTab,
      };
    },
    ...mapActions({
      getReviews: "review/getReviews",
      getProducts: "product/getProducts",
    }),
  },
  computed: {
    ...mapState({
      reviews: (state) => state.review.reviews,
      products: (state) => state.product.products,
    }),
  },
  created() {
    this.getReviews();
    this.getProducts();
  },
};
</script>

<style scoped>
.container-reviews {
  width: 50%;
  margin: 100px auto;
}

.container-reviews .tabs {
  display: flex;
  justify-content: center;
}

.container-reviews span {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px 15px;
}

.container-reviews .makeReview {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.container-reviews .reviewsTab {
  height: 60vh;
  overflow-y: auto;
}

.active {
  color: var(--green);
}
</style>
