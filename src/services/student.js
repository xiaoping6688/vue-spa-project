/**
 * 学生管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import StudentVO from './model/StudentVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取学生信息
 */
export function getStudents (campusId, gradeId) {
  let promise = get(API.GET_STUDENTS + `/${campusId}/${gradeId}`, null, { headers: headers })
  return httpResultProxy(promise, StudentVO)
}

/**
 * 查询学生信息
 */
export function queryStudents (stuName, stuNum) {
  let args = {
    stu_name: stuName,
    stu_num: stuNum
  }

  let promise = post(API.QUERY_STUDENTS, args, { headers: headers })
  return httpResultProxy(promise)
}

/**
 * 添加学生
 */
export function addStudent (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    campus_id: it.next().value,
    grade_id: it.next().value,
    mobile: it.next().value,
    parent_role: it.next().value,
    school: it.next().value,
    stu_name: it.next().value,
    stu_sex: it.next().value
  }

  let promise = post(API.ADD_STUDENT, args, { headers: headers })
  return httpResultProxy(promise)
}

/**
 * 购买课程
 */
export function purchaseCourse (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    stu_id: it.next().value,
    class_id: it.next().value
  }

  let promise = post(API.PURCHASE_COURSE, args, { headers: headers })
  return httpResultProxy(promise)
}
