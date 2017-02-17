/**
 * 学科管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import SubjectVO from './model/SubjectVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取学科
 */
export function getSubjects (orgId) {
  let promise = get(API.GET_SUBJECTS + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, SubjectVO)
}

/**
 * 添加学科
 */
export function addSubject (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    subject_name: it.next().value
  }

  let promise = post(API.ADD_SUBJECT, args, { headers: headers })
  return httpResultProxy(promise)
}
