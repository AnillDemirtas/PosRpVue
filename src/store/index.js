import Vue from "vue";
import Vuex from "vuex";
import { config_cagir } from "@/query/oturum";

Vue.use(Vuex);

// store/index.js

export default new Vuex.Store({
  state: {
    navDrawer: false,
    id: null,
    adSoyad: null,
    apiurl: null,
    // Diğer state değerleri
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setAdSoyad(state, adSoyad) {
      state.adSoyad = adSoyad;
    },
    setApiUrl(state, apiurl) {
      state.apiurl = apiurl;
    },
    // Diğer mutations tanımlamaları
  },
  getters: {
    getId: (state) => state.id,
    getAdSoyad: (state) => state.adSoyad,
    // Diğer getters tanımlamaları
  },
  actions: {
    async fetchConfigBilgileri({ commit }) {
      const bilgi = await config_cagir();
      commit("setApiUrl", bilgi.apiUrl);
    },
    // Diğer actions tanımlamaları
  },
  modules: {
    // Diğer modüller tanımlamaları
  },
});
