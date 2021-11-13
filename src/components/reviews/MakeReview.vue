<template>
  <div class="form-container">
    <form @submit.prevent="createReview">
      <Multiselect
        class="select"
        :label="sendLabel('Product', $v.review.productSelected.$error)"
        :class="{ error: $v.review.productSelected.$error }"
        :options="products"
        placeholder="Select a product"
        @set-title="setTitle"
        :value="review.productSelected"
        @close="$v.review.productSelected.$touch()"
      />

      <BaseInput
        class="title"
        :label="sendLabel('Title', $v.review.title.$error)"
        :class="{ error: $v.review.title.$error }"
        v-model="review.title"
        placeholder="Title"
        type="text"
        @blur="$v.review.title.$touch()"
      />

      <BaseTextarea
        class="review"
        :label="sendLabel('Review', $v.review.description.$error)"
        :class="{ error: $v.review.description.$error }"
        v-model="review.description"
        placeholder="Enter a review"
        type="text"
        rows="4"
        @blur="$v.review.description.$touch()"
      />

      <BaseSelect
        class="rating"
        :label="sendLabel('Rating', $v.review.rating.$error)"
        :class="{ error: $v.review.rating.$error }"
        :options="rating"
        v-model.number="review.rating"
        :value="review.rating"
        @blur="$v.review.rating.$touch()"
      />

      <BaseButton
        type="submit"
        buttonClass="make-a-review"
        :disabled="$v.$anyError"
        >{{ disableBtn }}</BaseButton
      >
    </form>
  </div>
</template>

<script>
import NProgress from "nprogress";
import Multiselect from "@/components/reviews/Multiselect.vue";
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      rating: [1, 2, 3, 4, 5],
      review: this.createFreshReviewObject(),
    };
  },
  validations: {
    review: {
      productSelected: { required },
      title: { required },
      description: { required },
      rating: { required: required },
    },
  },
  computed: {
    disableBtn() {
      return this.$v.$anyError
        ? "Please fill out the required field(s)!"
        : "Submit";
    },
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
        rating: null,
      };
    },
    createReview() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("review/createReview", this.review)
          .then(() => {
            this.$router.go();
            this.review = this.createFreshReviewObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    setTitle(title) {
      this.review.productSelected = title;
    },
    sendLabel(field, condition) {
      return condition ? `${field} is required!` : field;
    },
  },
};
</script>

<style scoped>
.form-container {
  height: 50vh;
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

.error {
  color: red;
}

.btnError {
  background-color: red;
}
</style>
