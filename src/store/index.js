import Vue from 'vue'
import Vuex from 'vuex'
import {getCepApi} from "../server/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cep: ''
  },
  getters: {
  },
  mutations: {
    GET_CEP(state, data) {
      state.cep = data
    }
  },
  actions: {
    async getCep({ commit }, payload) {
      try {
        const response = await getCepApi(payload)
        commit('GET_CEP', response)
        return response
      } catch (err) {
        console.error(err)
      }

    }
  },
  modules: {
  }
})
