/**
 * 角色管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import RoleVO from './model/RoleVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取角色
 */
export function getRoles (orgId) {
  let promise = get(API.GET_ROLES + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, RoleVO)
}

/**
 * 添加角色
 */
export function addRole (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    role_name: it.next().value
  }

  let promise = post(API.ADD_ROLE, args, { headers: headers })
  return httpResultProxy(promise)
}
