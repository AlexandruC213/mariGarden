import EventServices from "@/services/EventServices.js";

export const namespaced = true;

export const state = {
  products: [],
  currentProduct: {
    reviews: [],
  },
  lastLoadedPage: null,
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.currentProduct = { ...product, reviews: [] };
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
      dispatch("setProductReviews");
      // dispatch("getProductReviews", product.title);
    } else {
      EventServices.fetchProduct(id)
        .then((response) => {
          commit("SET_PRODUCT", response.data);
          dispatch("setProductReviews");
          // dispatch("getProductReviews", response.data.title);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  },

  // getProductReviews({ commit, rootGetters, dispatch }, title) {
  //   dispatch("review/getReviews", null, { root: true })
  //     .then(() => {
  //       const productReviews =
  //         rootGetters["review/selectProductReviews"](title);
  //       commit("SET_PRODUCT_REVIEWS", productReviews);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // },

  setPage({ commit }, page) {
    commit("SET_LAST_PAGE", page);
  },

  setProductReviews({ commit, state }) {
    EventServices.fetchProductReviews(state.currentProduct.title).then(
      (response) => {
        console.log(response.data);
        commit("SET_PRODUCT_REVIEWS", response.data);
        console.log(state.currentProduct);
      }
    );
  },
};

export const getters = {
  selectProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id);
  },
};
