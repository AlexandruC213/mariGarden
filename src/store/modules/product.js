import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  products: [],
  currentProduct: {},
  lastLoadedPage: null,
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.currentProduct = product;
  },
  SET_LAST_PAGE(state, page) {
    state.lastLoadedPage = page;
  },
  SET_PRODUCT_REVIEWS(state, reviews) {
    state.currentProduct["reviews"] = reviews;
  },
};

export const actions = {
  getProducts({ commit }) {
    return EventServices.fetchProducts()
      .then((response) => {
        commit("SET_PRODUCTS", response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  getProduct({ commit, getters, dispatch }, id) {
    const product = getters.selectProductById(id);

    if (product) {
      commit("SET_PRODUCT", product);
      dispatch("getProductReviews", product.title);
    } else {
      EventServices.fetchProduct(id).then((response) => {
        commit("SET_PRODUCT", response.data);
        dispatch("getProductReviews", response.data.title);
      });
    }
  },

  getProductReviews({ commit, rootGetters }, title) {
    const productReviews = rootGetters["review/selectProductReviews"](title);
    commit("SET_PRODUCT_REVIEWS", productReviews);
  },

  setPage({ commit }, page) {
    commit("SET_LAST_PAGE", page);
  },
};

export const getters = {
  selectProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
};
