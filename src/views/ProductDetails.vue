<template>
  <transition name="fade-in" mode="in-out" appear>
    <div class="page-container">
      <div class="productDetails-container">
        <div
          class="image-container"
          :style="{ backgroundImage: `url(${product.image})` }"
        >
          <div class="details-container">
            <div class="title-price">
              <p>{{ product.title }}</p>
              <p>${{ product.price | rating }}</p>
            </div>
            <div class="description">
              <p>{{ product.longDesc }}</p>
            </div>
            <div class="rating-btnBuy">
              <p v-if="productReviewsLength">
                Rating: {{ productRating | rating }}/5
              </p>
              <p v-else>This product has no rating yet</p>
              <button @click="addProd">
                <i class="fas fa-shopping-cart"></i> Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="reviews-container" ref="reviews" v-if="productReviewsLength">
        <div class="loading-container" v-show="loading">
          <div class="loading">
            <span class="fas fa-spinner fa-spin"></span> Loading
          </div>
        </div>
        <DisplayReviews :reviews="tempReviews" :reviewsProduct="true" />
      </div>
      <div v-else class="no-reviews">
        <p>This product Has no reviews yet!</p>
      </div>
    </div>
  </transition>
</template>

<script>
import DisplayReviews from "@/components/reviews/DisplayReviews.vue";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    DisplayReviews,
  },
  data() {
    return {
      loading: false,
      tempReviews: [],
      reviewsPerScroll: 2,
      scrollTimes: 2,
      rating: 0,
    };
  },
  methods: {
    addProd() {
      this.addProduct(this.product);
    },
    loadMoreReviews() {
      const that = this;
      window.onscroll = function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          const limit = Math.ceil(that.product.reviews.length / 2);
          that.loading = that.scrollTimes <= limit ? true : false;
          setTimeout(() => {
            if (that.scrollTimes <= limit) {
              const coppyReviews = [...that.product.reviews];
              that.tempReviews = coppyReviews
                .reverse()
                .slice(0, that.reviewsPerScroll * that.scrollTimes);
              that.scrollTimes++;
              that.loading = false;
            }
          }, 500);
        }
      };
    },
    ...mapActions({
      addProduct: "cart/addProduct",
    }),
  },
  computed: {
    productRating() {
      let rating = null;
      for (const review of this.product.reviews) {
        rating += review.rating;
      }
      return rating / this.product.reviews.length;
    },
    productReviewsLength() {
      return this.product.reviews.length;
    },
    ...mapState({
      product: (state) => state.product.currentProduct,
    }),
  },
  mounted() {
    if (this.productReviewsLength) {
      const coppyReviews = [...this.product.reviews];
      this.tempReviews = coppyReviews.reverse().slice(0, this.reviewsPerScroll);
      this.loadMoreReviews();
    }
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-container .reviews-container {
  width: 90%;
  margin: 50px 0 75px 0;
  position: relative;
}

.page-container .reviews-container .loading-container {
  width: 100%;
  height: calc(100% - 20px);
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 2;
}

.page-container .reviews-container .loading-container .loading {
  color: #fff;
  background-color: var(--green);
  padding: 10px 20px;
  border-radius: 5px;
}

.page-container .no-reviews {
  padding: 20px;
  border: 1px solid black;
  margin: 25px 0 75px 0;
}

.page-container .productDetails-container {
  width: 100%;

  border-radius: 7px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.productDetails-container .image-container {
  width: 90%;
  height: 80vh;
  border-radius: 7px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 100px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.productDetails-container .details-container {
  width: 100%;
  height: 35%;
  background-color: rgba(0, 0, 0, 0.45);

  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.productDetails-container .details-container .title-price,
.productDetails-container .details-container .description,
.productDetails-container .details-container .rating-btnBuy {
  color: var(--white);
  height: 33.33%;
}

.productDetails-container .details-container .title-price,
.productDetails-container .details-container .rating-btnBuy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.productDetails-container .details-container .title-price p {
  font-size: 1.75rem;
  padding: 0 15px;
}

.productDetails-container .details-container .description {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.productDetails-container .details-container .description p,
.productDetails-container .details-container .rating-btnBuy p {
  padding-left: 15px;
}

.productDetails-container .details-container .rating-btnBuy button {
  font-size: 1rem;
  border: none;
  padding: 10px 15px;
  margin-right: 15px;
  border-radius: 7px;
  cursor: pointer;
  background-color: var(--orange);
}

.productDetails-container .details-container .rating-btnBuy button:hover {
  background-color: rgba(255, 193, 7, 0.8);
}
</style>
