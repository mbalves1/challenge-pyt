import Vue from 'vue'
import Vuex from 'vuex'
import {getCepApi} from "../server/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getCep(_, payload) {
      try {
        console.log(payload)
        const response = await getCepApi(payload)

        return response
      } catch (err) {
        console.error(err)
      }

    }
  },
  modules: {
  }
})
