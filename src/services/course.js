/**
 * 课程管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'
import CourseVO from './model/CourseVO'

let headers = {
  'plat': 'principal-plat'
}

/**
 * 获取课程
 * @param {String} subjectId 科目ID
 * @return {Object} 返回代理CourseVO的Promise对象
 */
export function getCourses (subjectId) {
  let promise = get(API.GET_COURSES + `/${subjectId}`, null, { headers: headers })
  return httpResultProxy(promise, CourseVO)
}

/**
 * 添加课程
 */
export function addCourse (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    subject_id: it.next().value,
    course_name: it.next().value,
    desc: it.next().value
  }

  let promise = post(API.ADD_COURSE, args, { headers: headers })
  return httpResultProxy(promise)
}
