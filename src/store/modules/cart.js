export const namespaced = true;

export const state = {
  cartItems: [],
  total: 0,
  isCardVisible: false,
};

export const mutations = {
  SHOW_CART(state) {
    state.isCardVisible = !state.isCardVisible;
  },
  ADD_PRODUCT_TO_CART(state, product) {
    state.cartItems.push(product);
  },
  INCREMENT_QUANTITY(state, index) {
    state.cartItems[index].quantity++;
  },
  DECREASE_QUANTITY(state, index) {
    state.cartItems[index].quantity--;
  },
  CALCULATE_TOTAL(state, total) {
    state.total = total;
  },
  DELETE_PRODUCT_FROM_CART(state, index) {
    state.cartItems.splice(index, 1);
  },
};

export const actions = {
  showCart({ commit }) {
    commit("SHOW_CART");
  },
  addProduct({ commit, getters }, product) {
    let prodIndex = getters.findProductIndex(product.id);

    let exists = getters.checkCartforProduct(product.id);

    if (exists) {
      commit("INCREMENT_QUANTITY", prodIndex);
    } else {
      commit("ADD_PRODUCT_TO_CART", product);
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

  deleteProduct({ commit, getters }, product) {
    let prodIndex = getters.findProductIndex(product.id);
    product.quantity = 1;
    commit("DELETE_PRODUCT_FROM_CART", prodIndex);
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
