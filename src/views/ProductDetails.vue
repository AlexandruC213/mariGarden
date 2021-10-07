<template>
  <div class="productDetails-container">
    <div
      class="image-container"
      :style="{ backgroundImage: `url(${product.image})` }"
    >
      <div class="details-container">
        <div class="title-price">
          <p>{{ product.title }}</p>
          <p>{{ product.price }}</p>
        </div>
        <div class="description">
          <p>{{ product.longDesc }}</p>
        </div>
        <div class="rating-btnBuy">
          <p>Rating: 5/5</p>
          <button @click="addProd">
            <i class="fas fa-shopping-cart"></i> Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    addProd() {
      this.$store.dispatch("cart/addProduct", this.product);
    },
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),
  },
  created() {
    this.$store.dispatch("product/getProduct", this.id);
  },
};
</script>

<style scoped>
.productDetails-container {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.productDetails-container .image-container {
  width: 90%;
  height: 65vh;
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
