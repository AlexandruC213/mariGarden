import EventServices from "@/services/EventServices.js";
// import { filter } from "core-js/core/array";

export const namespaced = true;

export const state = {
  products: [],
  allProducts: [],
  product: {},
  productReviews: [],
  productRating: 0,
  numberOfProducts: null,
  perPage: 4,
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT_DETAILS(state, product) {
    state.product = product;
  },
  SET_NUMBER_OF_PRODUCTS(state, number) {
    state.numberOfProducts = number;
  },
  SET_ALL_PRODUCTS(state, allProducts) {
    state.allProducts = allProducts;
  },
  SET_PRODUCT_REVIEWS(state, reviews) {
    state.productReviews = reviews;
  },
  SET_PRODUCT_RATING(state, rating) {
    state.productRating = rating;
  },
};

export const actions = {
  getProducts({ commit, dispatch, state }, { page }) {
    return EventServices.fetchProducts(state.perPage, page)
      .then((response) => {
        commit("SET_NUMBER_OF_PRODUCTS", response.headers["x-total-count"]);
        commit("SET_PRODUCTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching products: " + error.message,
        };
        dispatch("notification/addNotification", notification, { root: true });
      });
  },
  getProduct({ commit, getters, dispatch }, id) {
    let product = getters.getProductById(id);

    if (product) {
      commit("SET_PRODUCT_DETAILS", product);
      dispatch("getProductReviews");
      return product;
    } else {
      return EventServices.fetchProductDetails(id).then((response) => {
        commit("SET_PRODUCT_DETAILS", response.data);
        dispatch("getProductReviews");
        return response.data;
      });
    }
  },
  getAllProducts({ commit }) {
    return EventServices.fetchAllProducts().then((response) => {
      commit("SET_ALL_PRODUCTS", response.data);
      return response.data;
    });
  },
  getProductReviews({ commit, getters, dispatch }) {
    EventServices.fetchReviews()
      .then((response) => {
        const reviews = response.data;
        const filteredReviews = getters.selectProductReviews(reviews);
        commit("SET_PRODUCT_REVIEWS", filteredReviews[0]);
        commit("SET_PRODUCT_RATING", filteredReviews[1]);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching reviews for this product: " +
            error.message,
        };
        dispatch("notification/addNotification", notification, { root: true });
      });
  },
};

export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
  selectProductReviews: (state) => (reviews) => {
    let prodReviews = [];
    let rating = 0;

    reviews.forEach((review) => {
      if (review.productSelected === state.product.title) {
        prodReviews.push(review);
        rating += review.rating;
      }
    });

    return [prodReviews, (rating / prodReviews.length).toFixed(2)];
  },
};
