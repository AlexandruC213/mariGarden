<template>
  <div class="container">
    <div class="product-container">
      <div
        class="image-container"
        :style="{ backgroundImage: `url(${prod.image})` }"
      >
        <div class="over-image">
          <p class="title-product">{{ prod.title }}</p>
          <p class="price-product">${{ prod.price }}</p>
        </div>
      </div>
      <div class="details-container">
        <div class="description">
          <p>{{ prod.shortDesc }}</p>
        </div>
        <div class="product-buttons">
          <router-link :to="{ name: 'details', params: { id: prod.id } }">
            <button class="btn-details">Details</button>
          </router-link>
          <Cart>
            <button slot="button" @click="addProd" class="btn-addToCart">
              <span slot="type">Add to Cart</span>
            </button>
          </Cart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    prod: {
      type: Object,
    },
  },
  methods: {
    addProd() {
      this.$store.dispatch("cart/addProduct", this.prod);
    },
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
  width: 250px;
  height: 300px;

  margin-top: 2em;

  border: 1px solid black;
  border-width: thin;
  border-radius: 5px;
}

.product-container .image-container {
  height: 70%;

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
  height: 30%;

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
  height: 65%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-container .details-container .product-buttons button {
  font-size: 1.25rem;
  padding: 7px 10px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.product-container .details-container .product-buttons .btn-details {
  margin-left: 7px;
}

.product-container .details-container .product-buttons .btn-details:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.product-container .details-container .product-buttons .btn-addToCart {
  background-color: var(--orange);
  margin-right: 7px;
}

.product-container .details-container .product-buttons .btn-addToCart:hover {
  background-color: rgba(255, 193, 7, 0.8);
}
</style>
