/**
 * 教师管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import TeacherVO from './model/TeacherVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取教师
 */
export function getTeachers (orgId) {
  let promise = get(API.GET_REGION_TEACHERS + `/${orgId}`, null, { headers: headers })
  return httpResultProxy(promise, TeacherVO)
}

/**
 * 添加教师
 */
export function addTeacher (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    campus_id: it.next().value,
    desc: it.next().value,
    grade_id: it.next().value,
    nature_work: it.next().value,
    org_id: it.next().value,
    role_id: it.next().value,
    subject_id: it.next().value,
    teacher_email: it.next().value,
    teacher_mobil: it.next().value,
    teacher_name: it.next().value,
    teacher_sex: it.next().value
  }

  let promise = post(API.ADD_TEACHER, args, { headers: headers })
  return httpResultProxy(promise)
}
