/**
 * 购课管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取购课记录
 */
export function getPurchases (payload) {
  let args = {
    // TODO
  }

  let promise = post(API.GET_PURCHASES, args, { headers: headers })
  return httpResultProxy(promise)
}
