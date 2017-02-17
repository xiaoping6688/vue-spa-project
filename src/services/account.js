/**
 * 用户Service
 */

import * as API from './API'
import { post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import AccountVO from './model/AccountVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 用户登录
 * @return {Object} 返回结果Promise
 */
export function login (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    username: it.next().value,
    password: it.next().value
  }

  let promise = post(API.LOGIN, args, { headers: headers })
  return httpResultProxy(promise, AccountVO)
}

/**
 * 注册
 */
export function regist (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    username: it.next().value,
    password: it.next().value
  }

  let promise = post(API.REGIST, args, { headers: headers })
  return httpResultProxy(promise)
}

/**
 * 退出
 */
export function logout () {

}
