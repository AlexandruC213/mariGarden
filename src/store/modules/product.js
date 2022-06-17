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
    state.currentProduct = { ...product };
  },
  SET_LAST_PAGE(state, page) {
    state.lastLoadedPage = page;
  },
};

export const actions = {
  getProducts({ commit, dispatch }) {
    return EventServices.fetchProducts()
      .then((response) => {
        commit("SET_PRODUCTS", response.data);
        console.log(response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message:
            "There was a problem fetching the products: " + error.message,
        };
        dispatch("notification/addNotification", notification, {
          root: true,
        });
      });
  },

  getProduct({ commit, getters, dispatch }, id) {
    const product = getters.selectProductById(id);
    if (product) {
      commit("SET_PRODUCT", product);
    } else {
      return EventServices.fetchProduct(id)
        .then((response) => {
          console.log(response.data);
          commit("SET_PRODUCT", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message:
              "There was a problem fetching this product: " + error.message,
          };
          dispatch("notification/addNotification", notification, {
            root: true,
          });
        });
    }
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
