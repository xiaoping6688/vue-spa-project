/**
 * 全局action处理
 */

import * as types from './mutation-types'

/**
 * 设置页面进度
 */
export const setPageProgress = ({ commit }, progress) => {
  commit(types.SET_PAGE_PROGRESS, progress)
  if (progress === 100) {
    setTimeout(() => {
      commit(types.SET_PAGE_PROGRESS, 0)
    }, 500)
  }
}

/**
 * 重置STORE
 */
export const resetStore = ({ commit }) => {
  commit(types.RESET_STATE)
}
