import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  products: [],
  product: {},
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT_DETAILS(state, product) {
    state.product = product;
  },
};

export const actions = {
  getProducts({ commit }) {
    EventServices.fetchProducts()
      .then((response) => {
        commit("SET_PRODUCTS", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getProduct({ commit, getters }, id) {
    let product = getters.getProductById(id);

    // de ce e nevoie de asta de vazut videoclipul

    if (product) {
      commit("SET_PRODUCT_DETAILS", product);
    } else {
      EventServices.fetchProductDetails(id)
        .then((response) => {
          commit("SET_PRODUCT_DETAILS", response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  },
};

export const getters = {
  getProductById: (state) => (id) => {
    state.products.find((product) => product.id === id);
  },
};
