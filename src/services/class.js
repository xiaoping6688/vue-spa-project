/**
 * 班级管理Service
 */

import * as API from './API'
import { post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import ClassVO from './model/ClassVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取班级信息
 */
export function getClasses (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    campus_id: it.next().value,
    class_type_id: it.next().value,
    finish_date: it.next().value,
    grade_id: it.next().value,
    org_id: it.next().value,
    start_date: it.next().value,
    subject_id: it.next().value,
    teacher_id: it.next().value,
    term_id: it.next().value,
    year_id: it.next().value
  }

  let promise = post(API.GET_CLASSES, args, { headers: headers })
  return httpResultProxy(promise, ClassVO)
}

/**
 * 添加班级
 */
export function addClass (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    campus_id: it.next().value,
    charge_standard: it.next().value,
    class_type_id: it.next().value,
    course_id: it.next().value,
    finish_date: it.next().value,
    grade_id: it.next().value,
    in_class_time: it.next().value,
    org_id: it.next().value,
    out_class_time: it.next().value,
    planner_id: it.next().value,
    school_id: it.next().value,
    school_room_id: it.next().value,
    start_date: it.next().value,
    student_num: it.next().value,
    subject_id: it.next().value,
    teacher_id: it.next().value,
    term_id: it.next().value,
    total_num: it.next().value,
    tutor_id: it.next().value,
    year_id: it.next().value
  }

  let promise = post(API.ADD_CLASS, args, { headers: headers })
  return httpResultProxy(promise)
}

/**
 * 获取班级主讲教师
 */
export function getMasterTeachers (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    campus_id: it.next().value,
    class_type_id: it.next().value,
    grade_id: it.next().value,
    subject_id: it.next().value,
    term_id: it.next().value,
    year_id: it.next().value
  }

  let promise = post(API.GET_CLASS_TEACHERS, args, { headers: headers })
  return httpResultProxy(promise)
}

/**
 * 获取辅导教师
 */
export function getCounselors (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    campus_id: it.next().value,
    grade_id: it.next().value,
    role_id: it.next().value,
    subject_id: it.next().value
  }

  let promise = post(API.GET_TEACHERS, args, { headers: headers })
  return httpResultProxy(promise)
}
