<template>
  <transition name="fade-in" appear>
    <div class="container-reviews">
      <div class="tabs">
        <span class="active">Reviews</span>
      </div>

      <DisplayReviews
        v-if="displayTab('Reviews')"
        class="reviewsTab"
        :reviews="reviews"
      />
    </div>
  </transition>
</template>

<script>
import DisplayReviews from "@/components/reviews/DisplayReviews.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    DisplayReviews,
  },
  data() {
    return {
      tabs: ["Reviews"],
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

/* Transitions*/

.fade-in-enter {
  opacity: 0;
}

.fade-in-enter-active {
  transition: opacity 0.5s ease-in;
}
</style>
