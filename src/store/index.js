import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { state, mutations } from './mutations'
import account from './modules/account'

Vue.use(Vuex)

let isDebugMode = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    account
  },
  strict: isDebugMode
})

// 热重载
if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
    './modules/account'
  ], () => {
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    store.hotUpdate({
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default,
      modules: {
        account: require('./modules/account').default
      }
    })
  })
}

export default store
