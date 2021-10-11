import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  products: [],
  allProducts: [],
  product: {},
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
  getProduct({ commit, getters }, id) {
    let product = getters.getProductById(id);

    if (product) {
      commit("SET_PRODUCT_DETAILS", product);
      return product;
    } else {
      return EventServices.fetchProductDetails(id).then((response) => {
        commit("SET_PRODUCT_DETAILS", response.data);
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
};

export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
};
