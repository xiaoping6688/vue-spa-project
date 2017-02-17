/**
 * 教室管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import ClassroomVO from './model/ClassroomVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取教室
 */
export function getClassrooms (schoolId) {
  let promise = get(API.GET_CLASSROOMS + `/${schoolId}`, null, { headers: headers })
  return httpResultProxy(promise, ClassroomVO)
}

/**
 * 添加教室
 */
export function addClassroom (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    campus_id: it.next().value,
    school_id: it.next().value,
    school_room_name: it.next().value
  }

  let promise = post(API.ADD_CLASSROOM, args, { headers: headers })
  return httpResultProxy(promise)
}
