/**
 * 用户模块
 */

import * as service from '../../services/account'
import * as types from '../mutation-types'
import AccountVO from '../../services/model/AccountVO'

let userId = window.sessionStorage.userId || ''

// initial state
const state = new AccountVO(userId)

// getters
const getters = {
  hasLoggedIn: state => state.userId
}

// actions
const actions = {
  login ({ commit, state }, payload) {
    return service.login(payload).then(account => {
      window.sessionStorage.userId = account.userId
      commit(types.SET_ACCOUNT, account)
    })
  },
  regist ({ commit, state }, payload) {
    return service.regist(payload).then(data => {
      window.sessionStorage.userId = data
      commit(types.SET_ACCOUNT, { userId: data })
    })
  },
  logout ({ commit, state }) {
    window.sessionStorage.clear()
    commit(types.RESET_STATE)
  }
}

// mutations
const mutations = {
  [types.SET_ACCOUNT] (state, data) {
    Object.assign(state, data)
  },
  [types.RESET_STATE] (state) {
    state.userId = '' // TODO
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
