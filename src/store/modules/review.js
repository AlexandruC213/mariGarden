import EventServices from "../../services/EventServices";

export const namespaced = true;

export const state = {
  reviews: [],
};

export const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
  ADD_REVIEW(state, review) {
    state.reviews.push(review);
  },
};

export const actions = {
  getReviews({ commit, dispatch, state }) {
    if (state.reviews.length == 0) {
      return EventServices.fetchReviews()
        .then((response) => {
          commit("SET_REVIEWS", response.data);
          return response.data;
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching reviews: " + error.message,
          };
          dispatch("notification/addNotification", notification, {
            root: true,
          });
        });
    } else {
      return state.reviews;
    }
  },
  addReview({ commit, dispatch }, review) {
    return EventServices.postReview(review)
      .then(() => {
        commit("ADD_REVIEW", review);
        const notification = {
          type: "success",
          message: "Your review has been created!",
        };
        dispatch("notification/addNotification", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your review: " + error.message,
        };
        dispatch("notification/addNotification", notification, { root: true });
        throw error;
      });
  },
};

export const getters = {
  selectProductReviews: (state) => (productName) => {
    return state.reviews.filter(
      (review) => review.productSelected === productName
    );
  },
};
