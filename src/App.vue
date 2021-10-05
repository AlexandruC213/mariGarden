<template>
  <div id="app">
    <div id="nav">
      <Header
        :cartItems="this.cartItems"
        :total="totalCalc"
        @increment="incrementQuantity"
        @decrement="decrementQuantity"
        @delete="deleteItem"
      />
    </div>
    <router-view />
    <Footer class="footer" />
  </div>
</template>

<script>
import eventBus from "./eventBus";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    addToCart(item) {
      const exists = this.cartItems.find((i) => i.prod.id === item.prod.id);

      if (exists) {
        this.incrementQuantity(exists);
      } else {
        this.cartItems.push(item);
      }
    },
    incrementQuantity(item) {
      const index = this.cartItems.findIndex((i) => i.prod.id === item.prod.id);

      if (index != -1) {
        item.quantity++;
      }
    },
    decrementQuantity(item) {
      const index = this.cartItems.findIndex((i) => i.prod.id === item.prod.id);

      if (index != -1 && item.quantity != 1) {
        item.quantity--;
      } else {
        this.deleteItem(item);
      }
    },
    deleteItem(item) {
      const index = this.cartItems.findIndex((i) => i.prod.id === item.prod.id);
      if (index != -1) {
        this.cartItems.splice(index, 1);
      }
    },
  },

  computed: {
    totalCalc() {
      let price = 0;
      for (const item of this.cartItems) {
        price += item.prod.price * item.quantity;
      }
      return parseInt(price.toFixed(2));
    },
  },
  mounted() {
    eventBus.$on("product-added", (item) => this.addToCart(item));
    eventBus.$on("increment", (item) => this.incrementQuantity(item));
    eventBus.$on("decrement", (item) => this.decrementQuantity(item));
    eventBus.$on("delete", (item) => this.deleteItem(item));
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

:root {
  --green: #2e7d32;
  --white: #fff;
  --black: #000;
  --orange: #ffc107;
  --gray: #757575;
}

#app {
  position: relative;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
}
</style>
