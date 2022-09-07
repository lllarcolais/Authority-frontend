import Vue from 'vue'
import Vuex from 'vuex'
import state from "./defaultState"
import mutations from "@/store/mutations"
import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  getters: {
  },
  mutations: mutations,
  actions: {
  },
  modules: modules
})
