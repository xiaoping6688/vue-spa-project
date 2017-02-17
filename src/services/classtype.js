/**
 * 班型管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import ClassTypeVO from './model/ClassTypeVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取班型
 */
export function getClassTypes (subjectId) {
  let promise = get(API.GET_CLASSTYPES + `/${subjectId}`, null, { headers: headers })
  return httpResultProxy(promise, ClassTypeVO)
}

/**
 * 添加班型
 */
export function addClassType (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    subject_id: it.next().value,
    course_id: it.next().value,
    class_type_name: it.next().value
  }

  let promise = post(API.ADD_CLASSTYPE, args, { headers: headers })
  return httpResultProxy(promise)
}
