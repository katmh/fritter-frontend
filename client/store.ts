import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms

    follows: [],
    readingList: []
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    removeAlert(state, message) {
      Vue.delete(state.alerts, message);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateFollows(state, follows) {
      /**
       * Update the stored follows to the provided follows.
       * @param follows - Follows to store
       */
      state.follows = follows;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshFollows(state) {
      /**
       * Refreshes the `follows` field of the store by checking the server.
       * If no user is logged in, sets `follows` to empty array.
       */
      try {
        state.follows = await fetch('api/follows').then(async r => r.json());
      } catch (_) {
        state.follows = [];
      }
    },
    async refreshReadingList(state) {
      /**
       * Refreshes the `readingList` field of the store by checking the server.
       * If no user is logged in, sets `readingList` to empty array.
       */
      try {
        state.readingList = await fetch('api/readinglist').then(async r => r.json());
      } catch (_) {
        state.readingList = [];
      }
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
