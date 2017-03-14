/**
 * 接口配置
 */

// const BaseUrl = 'http://www/api' // for production
// const BaseUrl = '' // for local poxy
const BaseUrl = '/mock' // for local mock test

export const LOGIN = BaseUrl + '/edu_rest/org_login' // 登录
export const REGIST = BaseUrl + '/edu_rest/org_register' // 注册

export const GET_REGIONS = BaseUrl + '/edu_rest/acquire_campus' // 获取校区
export const ADD_REGION = BaseUrl + '/edu_rest/establish_campus' // 添加校区
export const ADD_SCHOOL = BaseUrl + '/edu_rest/establish_school' // 添加学校
export const GET_SCHOOLS = BaseUrl + '/edu_rest/acquire_school' // 获取学校（服务中心）

export const GET_CLASSROOMS = BaseUrl + '/edu_rest/acquire_school_room' // 获取教室
export const ADD_CLASSROOM = BaseUrl + '/edu_rest/establish_school_room' // 添加教室

export const GET_ROLES = BaseUrl + '/edu_rest/acquire_role' // 获取角色
export const ADD_ROLE = BaseUrl + '/edu_rest/establish_role' // 添加角色

export const GET_REGION_TEACHERS = BaseUrl + '/edu_rest/acquire_teacher_by_org' // 获取机构教师
export const GET_TEACHERS = BaseUrl + '/edu_rest/acquire_teacher' // 获取教师 辅导老师？
export const ADD_TEACHER = BaseUrl + '/edu_rest/establish_teacher' // 添加教师

export const GET_SUBJECTS = BaseUrl + '/edu_rest/acquire_subject' // 获取科目
export const ADD_SUBJECT = BaseUrl + '/edu_rest/establish_subject' // 添加科目

export const GET_YEARS = BaseUrl + '/edu_rest/acquire_year' // 获取年份
export const GET_TERMS = BaseUrl + '/edu_rest/acquire_term' // 获取学期
export const GET_GRADES = BaseUrl + '/edu_rest/acquire_grade' // 获取年级
