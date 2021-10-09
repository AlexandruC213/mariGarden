export const namespaced = true;

export const state = {
  notifications: [],
};

let id = 1;

export const mutations = {
  ADD(state, notification) {
    state.notifications.push({
      ...notification,
      id: id++,
    });
  },
  DELETE(state, index) {
    state.notifications.splice(index, 1);
  },
};

export const actions = {
  addNotification({ commit }, notification) {
    commit("ADD", notification);
  },
  deleteNotification({ commit, getters }, notification) {
    const index = getters.findNotificationIndex(notification.id);
    commit("DELETE", index);
  },
};

export const getters = {
  findNotificationIndex: (state) => (id) => {
    return state.notifications.findIndex((not) => not.id === id);
  },
};
