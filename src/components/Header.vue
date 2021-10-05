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
              <i class="fas fa-shopping-cart"></i>
            </span>
          </button>
          <div slot="content" class="cart-content" v-show="isCardVisible">
            <div
              class="cart-details"
              v-for="item in this.cartItems"
              :key="item.prod.id"
            >
              <div class="img-prod">
                <img :src="item.prod.image" alt="aici imagine" />
              </div>
              <div class="details-prod">
                <p>{{ item.prod.title }} x{{ item.quantity }}</p>
                <p class="details-small">{{ item.prod.shortDesc }}</p>
                <p class="details-small">{{ item.prod.price }}</p>
              </div>
              <div class="control-buttons">
                <CartIcons>
                  <button slot="button" @click="editItem(item, '+')">
                    <span slot="sign"><i class="fas fa-plus"></i></span>
                  </button>
                </CartIcons>
                <CartIcons>
                  <button slot="button" @click="editItem(item, '-')">
                    <span slot="sign"><i class="fas fa-minus"></i></span>
                  </button>
                </CartIcons>
                <CartIcons>
                  <button slot="button" @click="editItem(item, '!')">
                    <span slot="sign"><i class="fas fa-times"></i></span>
                  </button>
                </CartIcons>
              </div>
            </div>
            <div class="cart-checkout">
              <div class="total">
                <p>Total: ${{ total }}</p>
              </div>
              <router-link :to="{ name: 'checkout' }">
                <div class="checkout-btn">
                  <button :disabled="this.cartItems.length == 0">
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
import eventBus from "../eventBus.js";

export default {
  components: {
    CartIcons,
  },
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isCardVisible: false,
      price: 0,
    };
  },
  methods: {
    showCart() {
      this.isCardVisible = !this.isCardVisible;
    },
    editItem(item, sign) {
      function increment(item) {
        eventBus.$emit("increment", item);
      }

      function decrement(item) {
        eventBus.$emit("decrement", item);
      }
      function remove(item) {
        eventBus.$emit("delete", item);
      }

      const operation = {
        "+": increment,
        "-": decrement,
        "!": remove,
      };

      operation[sign](item);
    },
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
  color: #000;

  border-radius: 5px;
  background-color: var(--white);

  position: fixed;
  right: 15px;
  top: 56px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-content .cart-details {
  width: 95%;
  min-height: 64px;
  padding: 10px 16px;

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
  width: 30%;
}

.cart-content .cart-details .details-prod .details-small {
  color: var(--gray);
  font-size: 0.85rem;
}

.cart-content .cart-details .img-prod,
.cart-content .cart-details .control-buttons {
  width: 25%;

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
</style>
