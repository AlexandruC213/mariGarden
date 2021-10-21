<template>
  <div class="form-container">
    <form @submit.prevent="createReview">
      <div class="select">
        <label>Select a Product</label>
        <select v-model="review.productSelected">
          <option v-for="product in products" :key="product.id">
            {{ product.title }}
          </option>
        </select>
      </div>

      <div class="title">
        <label>Title</label>
        <input v-model="review.title" type="text" />
      </div>

      <div class="review">
        <label>Review</label>
        <textarea v-model="review.description" type="text" rows="4" />
      </div>

      <div class="rating">
        <label>Select Rating</label>
        <select v-model.number="review.rating">
          <option v-for="index in 5" :key="index">{{ index }}</option>
        </select>
      </div>

      <button type="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
import NProgress from "nprogress";
import { mapState } from "vuex";

export default {
  data() {
    return {
      review: this.createFreshReviewObject(),
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  methods: {
    createFreshReviewObject() {
      return {
        productSelected: "",
        title: "",
        description: "",
        rating: 0,
      };
    },
    createReview() {
      NProgress.start();
      this.$store
        .dispatch("review/addReview", this.review)
        .then(() => {
          this.$router.go();
          this.review = this.createFreshReviewObject();
        })
        .catch(() => {
          NProgress.done();
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  height: 40vh;
}

.form-container form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-container .select,
.form-container .title,
.form-container .review,
.form-container .rating {
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
}

.form-container .select select option,
.form-container .select select,
.form-container .rating select,
.form-container .rating select option,
.form-container .title input,
.form-container .review textarea {
  font-size: 1rem;
}

.form-container .title input,
.form-container .review textarea {
  padding: 3px 5px;
}

.form-container .select select option,
.form-container .rating select option {
  text-align: center;
}

.form-container .title input {
  outline: none;
  height: 24px;
}

.form-container .review textarea {
  outline: none;
}

.form-container button {
  background-color: var(--orange);
  border: none;
  padding: 5px 0;
  font-size: 1.25rem;
  border-radius: 7px;
  cursor: pointer;
}

.form-container button:hover {
  background-color: rgba(255, 193, 7, 0.8);
}
</style>
