<template>
  <div class="header-container">
    <div class="logo">
      <router-link :to="{ name: 'home' }">Mari Garden</router-link>
    </div>
    <div class="links-cart-container">
      <div class="link">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'products' }">Products</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'reviews' }">Reviews</router-link>
      </div>
      <div class="cart-container">
        <Cart class="cart">
          <BaseButton slot="button" @click="showCart" buttonClass="btn-cart">
            <transition name="zoom-in" mode="out-in">
              <span
                :key="numberItems"
                v-if="numberItems > 0"
                class="number-products"
                >{{ numberItems }}</span
              >
            </transition>
            <i class="fas fa-shopping-cart"></i
          ></BaseButton>
          <transition slot="content" name="fade">
            <div class="cart-content" v-if="isCardVisible">
              <div
                class="cart-details"
                v-for="product in this.cartItems"
                :key="product.id"
              >
                <div class="img-prod">
                  <img :src="product.image" alt="aici imagine" />
                </div>
                <div class="details-prod">
                  <p>{{ product.title }} x{{ product.quantity }}</p>
                  <p class="details-small">{{ product.shortDesc }}</p>
                  <p class="details-small">${{ product.price | rating }}</p>
                </div>
                <div class="control-buttons-container">
                  <BaseButton
                    buttonClass="control-buttons"
                    @click="addProduct(product)"
                  >
                    <i class="fas fa-plus"></i>
                  </BaseButton>
                  <BaseButton
                    buttonClass="control-buttons"
                    @click="subtractProduct(product)"
                  >
                    <i class="fas fa-minus"></i>
                  </BaseButton>
                  <BaseButton
                    buttonClass="control-buttons"
                    @click="deleteProduct(product)"
                  >
                    <i class="fas fa-times"></i>
                  </BaseButton>
                </div>
              </div>
              <div class="cart-checkout">
                <div class="total">
                  <p>Total: ${{ calculateTotal }}</p>
                </div>
                <router-link :to="{ name: 'checkout' }">
                  <BaseButton :disabled="numberItems == 0">
                    <span><i class="fas fa-shopping-basket"></i></span>
                    Checkout</BaseButton
                  >
                </router-link>
              </div>
            </div>
          </transition>
        </Cart>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/cart/Cart.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    Cart,
  },
  data() {
    return {
      isCardVisible: false,
    };
  },
  methods: {
    showCart() {
      this.isCardVisible = !this.isCardVisible;
    },
    ...mapActions("cart", ["addProduct", "subtractProduct", "deleteProduct"]),
  },
  computed: {
    numberItems() {
      return this.cartItems.length;
    },
    ...mapGetters("cart", ["calculateTotal"]),
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
    }),
  },
};
</script>

<style scoped>
.header-container {
  width: 100vw;
  height: 7vh;

  color: var(--white);
  background-color: var(--green);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
}

.header-container .logo {
  padding-left: 25px;
}

.header-container .logo > a {
  font-size: 2.25rem;
  color: var(--white);
  text-decoration: none;
}

.header-container .links-cart-container {
  width: 25%;
  height: 100%;

  margin-right: 15px;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header-container .link > a {
  padding: 15px;
  font-size: 1.2rem;
  color: var(--white);
  text-decoration: none;
}

.header-container .link > a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.cart {
  position: relative;
}

.cart-content {
  width: 350px;
  max-height: 300px;
  color: #000;
  overflow-y: auto;

  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--white);

  position: fixed;
  right: 15px;
  top: 56px;

  display: inline-block;
}

.cart-content .cart-details {
  width: 90%;
  min-height: 80px;

  padding: 0px 16px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid black;
}

.cart-content .cart-checkout {
  width: 100%;
  min-height: 64px;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-content .cart-details .details-prod {
  width: 33%;
}

.cart-content .cart-details .details-prod .details-small {
  color: var(--gray);
  font-size: 0.85rem;
}

.cart-content .cart-details .img-prod {
  width: 33%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-content .cart-details .control-buttons-container {
  width: 35%;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.cart-content .cart-details .img-prod img {
  width: 50px;
  height: 50px;

  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.cart-content .cart-checkout .total p {
  font-size: 1.25rem;
  font-weight: 600;
}

.number-products {
  width: 18px;
  height: 18px;

  position: absolute;
  top: 1px;
  left: 0;
  font-size: 1rem;

  border-radius: 50%;
  background-color: var(--orange);
}

/* Transitions */

.zoom-in-enter,
.zoom-in-leave-to {
  transform: scale(1.5);
  color: rgba(0, 0, 0, 0.5);
}
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all 0.3s ease-in;
}
</style>
