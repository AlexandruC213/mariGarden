import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  products: [],
  product: {},
  numberOfProducts: null,
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
};

export const actions = {
  getProducts({ commit, dispatch }, { perPage, page }) {
    EventServices.fetchProducts(perPage, page)
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

    // facem doar un api call
    // Nu functioneaza !!!

    if (product) {
      commit("SET_PRODUCT_DETAILS", product);
    } else {
      EventServices.fetchProductDetails(id)
        .then((response) => {
          commit("SET_PRODUCT_DETAILS", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching product: " + error.message,
          };
          dispatch("notification/addNotification", notification, {
            root: true,
          });
        });
    }
  },
};

export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
};
