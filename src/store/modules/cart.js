export const namespaced = true;

export const state = {
  cartItems: [],
  total: 0,
};

export const mutations = {
  ADD_PRODUCT_TO_CART(state, product) {
    state.cartItems.push(product);
  },
  INCREMENT_QUANTITY(state, index) {
    state.cartItems[index].quantity++;
  },
  DECREASE_QUANTITY(state, index) {
    state.cartItems[index].quantity--;
  },
  DELETE_PRODUCT_FROM_CART(state, index) {
    state.cartItems.splice(index, 1);
  },
};

export const actions = {
  addProduct({ commit, getters, dispatch }, product) {
    let prodIndex = getters.findProductIndex(product.id);

    let exists = getters.checkCartforProduct(product.id);

    if (exists) {
      commit("INCREMENT_QUANTITY", prodIndex);
    } else {
      commit("ADD_PRODUCT_TO_CART", product);
      const notification = {
        type: "success",
        message: "Product was successfully added to cart!",
      };
      dispatch("notification/addNotification", notification, { root: true });
    }
  },

  subtractProduct({ commit, dispatch, getters }, product) {
    let prodIndex = getters.findProductIndex(product.id);
    if (product.quantity !== 1) {
      commit("DECREASE_QUANTITY", prodIndex);
    } else {
      dispatch("deleteProduct", product);
    }
  },

  deleteProduct({ commit, getters, dispatch }, product) {
    let prodIndex = getters.findProductIndex(product.id);
    product.quantity = 1;
    commit("DELETE_PRODUCT_FROM_CART", prodIndex);
    const notification = {
      type: "success",
      message: "Product was successfully deleted from cart!",
    };
    dispatch("notification/addNotification", notification, { root: true });
  },
};

export const getters = {
  checkCartforProduct: (state) => (id) => {
    return state.cartItems.find((product) => product.id === id);
  },
  findProductIndex: (state) => (id) => {
    return state.cartItems.findIndex((product) => product.id === id);
  },
  calculateTotal: (state) => {
    let tempTotal = 0;
    for (const product of state.cartItems) {
      tempTotal += product.price * product.quantity;
    }
    state.total = parseFloat(tempTotal).toFixed(2);
    return state.total;
  },
};
