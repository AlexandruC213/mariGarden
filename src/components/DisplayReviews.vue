<template>
  <div>
    <div class="review" v-for="review in reviews" :key="review.id">
      <div>
        <p class="title">{{ review.title }}</p>
        <p class="product">Product: {{ review.productSelected }}</p>
      </div>
      <div>
        <p class="rating">Rating: {{ review.rating }}/5</p>
      </div>
      <div>
        <p class="description">{{ review.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("review", ["reviews"]),
  },
  created() {
    this.$store.dispatch("review/getReviews");
    console.log(this.reviews);
  },
};
</script>

<style scoped>
.review {
  height: 125px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.review div:first-of-type {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 400;
}

.review div:first-of-type .title {
  padding: 5px 0 0 10px;
}

.review div:first-of-type .product {
  padding: 5px 10px 0 0;
}

.review .rating {
  padding-left: 10px;
}

.review .description {
  padding: 0 0 5px 10px;
}
</style>
