/**
 * 全局mutation处理
 */

import * as types from './mutation-types'

export const state = {
  pageProgress: 0
}

export const mutations = {
  // 设置页面进度
  [types.SET_PAGE_PROGRESS] (state, progress) {
    state.pageProgress = progress
  },
  // 重置state
  [types.RESET_STATE] (state) {

  }
}
