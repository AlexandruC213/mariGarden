import EventServices from "../../services/EventServices";

export const namespaced = true;

export const state = {
  reviews: [],
};

export const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
};

export const actions = {
  getReviews({ commit, dispatch }) {
    return EventServices.fetchReviews()
      .then((response) => {
        commit("SET_REVIEWS", response.data);
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
  },
};
