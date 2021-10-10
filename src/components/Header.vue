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
      <div class="cart-container">
        <Cart class="cart">
          <button slot="button" class="cart-btn" @click="showCart">
            <span slot="type">
              <span class="number-products" v-show="numberItems > 0">{{
                numberItems
              }}</span>
              <i class="fas fa-shopping-cart"></i>
            </span>
          </button>
          <div slot="content" class="cart-content" v-show="isCardVisible">
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
                <p class="details-small">{{ product.price }}</p>
              </div>
              <div class="control-buttons">
                <CartIcons>
                  <button slot="button" @click="addProduct(product)">
                    <span slot="sign"><i class="fas fa-plus"></i></span>
                  </button>
                </CartIcons>
                <CartIcons>
                  <button slot="button" @click="subtractProduct(product)">
                    <span slot="sign"><i class="fas fa-minus"></i></span>
                  </button>
                </CartIcons>
                <CartIcons>
                  <button slot="button" @click="deleteProduct(product)">
                    <span slot="sign"><i class="fas fa-times"></i></span>
                  </button>
                </CartIcons>
              </div>
            </div>
            <div class="cart-checkout">
              <div class="total">
                <p>Total: ${{ calculateTotal }}</p>
              </div>
              <router-link :to="{ name: 'checkout' }">
                <div class="checkout-btn">
                  <button :disabled="numberItems == 0">
                    <span><i class="fas fa-shopping-basket"></i></span>
                    Checkout
                  </button>
                </div>
              </router-link>
            </div>
          </div>
        </Cart>
      </div>
    </div>
  </div>
</template>

<script>
import CartIcons from "@/components/CartIcons.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    CartIcons,
  },
  methods: {
    ...mapActions("cart", [
      "showCart",
      "addProduct",
      "subtractProduct",
      "deleteProduct",
    ]),
  },
  computed: {
    numberItems() {
      return this.cartItems.length;
    },
    ...mapGetters("cart", ["calculateTotal"]),
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      total: (state) => state.cart.total,
      isCardVisible: (state) => state.cart.isCardVisible,
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

.header-container .links-cart-container .cart-container .cart-btn {
  padding: 13px;
  background-color: var(--green);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.header-container .links-cart-container .cart-container .cart-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.header-container .links-cart-container .cart-container .cart-btn span {
  font-size: 1rem;
}

.cart {
  position: relative;
}

.cart-content {
  width: 350px;
  max-height: 300px;
  color: #000;
  overflow-y: auto;

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
  margin: 5px 0;

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

.cart-content .cart-details .control-buttons {
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

.cart-content .cart-checkout .checkout-btn button {
  font-size: 1.25rem;
  padding: 7px 10px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  background-color: var(--orange);
}

.cart-content .cart-checkout .checkout-btn button:hover {
  background-color: rgba(255, 193, 7, 0.8);
}

.cart-content .cart-checkout .checkout-btn button:disabled {
  color: var(--black);
  background-color: var(--gray);
}

.cart-content .cart-details .control-buttons button {
  width: 24px;
  height: 24px;
  color: var(--white);
  font-weight: 500;
  background-color: var(--gray);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.cart-content .cart-details .control-buttons button:hover {
  background-color: var(--black);
}

.cart-content .cart-checkout .total p {
  font-size: 1.25rem;
  font-weight: 600;
}

.cart .cart-btn .number-products {
  width: 20px;
  height: 20px;

  position: absolute;
  top: 2px;
  left: 0;

  border-radius: 50%;
  background-color: var(--orange);
}
</style>
