<template>
  <div class="container">
    <div class="product-container">
      <div
        class="image-container"
        :style="{ backgroundImage: `url(${product.image})` }"
      >
        <div class="over-image">
          <p class="title-product">{{ product.title }}</p>
          <p class="price-product">${{ product.price }}</p>
        </div>
      </div>
      <div class="details-container">
        <div class="description">
          <p>{{ product.shortDesc }}</p>
        </div>
        <div class="product-buttons">
          <router-link :to="{ name: 'details', params: { id: product.id } }">
            <BaseButton buttonClass="btn-details">Details</BaseButton>
          </router-link>
          <BaseButton @click="addProd">Add to Cart</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    product: Object,
  },
  methods: {
    addProd() {
      this.addProduct(this.product);
    },
    ...mapActions({
      addProduct: "cart/addProduct",
    }),
  },
  computed: mapState(["cart"]),
};
</script>

<style scoped>
.container {
  min-width: 300px;
  margin-top: 50px;
}

.product-container {
  width: 300px;
  height: 300px;

  margin-top: 2em;

  border: 1px solid black;
  border-width: thin;
  border-radius: 5px;
}

.product-container .image-container {
  height: 200px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.product-container .image-container .over-image {
  width: 100%;
  height: 100%;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.product-container .image-container .over-image .title-product {
  height: 85%;
  font-size: 2rem;
  padding: 7px 0 0 10px;
}

.product-container .image-container .over-image .price-product {
  align-self: flex-end;
  font-size: 1rem;
  padding-right: 10px;
}

.product-container .details-container {
  height: 33%;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.product-container .details-container .description {
  height: 35%;
}

.product-container .details-container .description p {
  padding: 7px 0 0 7px;
}

.product-container .details-container .product-buttons {
  width: 95%;
  height: 65%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
