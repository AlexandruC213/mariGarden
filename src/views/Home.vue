<template>
  <div class="home">
    <div class="home-container">
      <div class="home-over-container">
        <div class="home-info">
          <p>Mari Garden</p>
          <router-link :to="{ name: 'products' }">
            <button>See all products</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="product-list-container">
      <ProductList />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/products/ProductList.vue";
import store from "@/store/index";

function getPageProductsAndReviews(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store.dispatch("product/getProducts").then(() => {
    routeTo.params.page = currentPage;
    store.dispatch("product/setPage", currentPage);
    next();
  });
}

export default {
  components: {
    ProductList,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageProductsAndReviews(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageProductsAndReviews(routeTo, next);
  },
};
</script>

<style scoped>
.home {
  width: 100%;
}

.home-container {
  width: 100%;
  height: 100vh;

  background-image: url("../assets/background.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.home-container .home-over-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container .home-over-container .home-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-container .home-over-container .home-info p {
  color: var(--white);
  font-size: 2.25rem;
  padding: 15px;
}

.home-container .home-over-container .home-info button {
  color: var(--white);
  font-size: 1rem;

  padding: 10px 15px;
  background-color: var(--green);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.home-container .home-over-container .home-info button:hover {
  background-color: rgba(46, 125, 50, 0.9);
}

.product-list-container {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
