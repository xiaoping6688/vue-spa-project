/**
 * 公共Service
 */

import * as API from './API'
import { get } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import CommonVO from './model/CommonVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取年份
 */
export function getYears (orgId) {
  let promise = get(API.GET_YEARS + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, CommonVO)
}

/**
 * 获取学期
 */
export function getTerms (orgId) {
  let promise = get(API.GET_TERMS + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, CommonVO)
}

/**
 * 获取年级
 */
export function getGrades (orgId) {
  let promise = get(API.GET_GRADES + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, CommonVO)
}
