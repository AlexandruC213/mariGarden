import EventServices from "../../services/EventServices";

export const namespaced = true;

export const state = {
  reviews: [],
  //   review: {},
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
  getReviews({ commit }) {
    console.log("Intra in getReviews");
    EventServices.fetchReviews()
      .then((response) => {
        console.log(response);
        commit("SET_REVIEWS", response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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

export const getters = {};
