<template>
  <div class="link-container">
    <router-link :to="{ name: checkPage(), query: setPage() }" class="link"
      ><slot></slot
    ></router-link>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    sign: String,
    productsPage: String,
  },
  methods: {
    setPage() {
      switch (this.sign) {
        case "+":
          return { page: this.page + 1 };
        case "-":
          return { page: this.page - 1 };
        default:
          return { page: this.page };
      }
    },
    checkPage() {
      this.productsPage === "products" ? this.productsPage : "home";
    },
  },
  computed: {
    currentPage() {
      return this.page === 1;
    },
  },
};
</script>

<style scoped>
.link-container {
  width: 50px;
  height: 50px;
  margin: 0 3px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid black;
}

.link-container .link {
  color: var(--black);
  text-decoration: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-container:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.link-container a.router-link-exact-active {
  border-radius: 50%;
  background-color: var(--green);
  color: var(--white);
}
</style>
