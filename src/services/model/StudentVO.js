/**
 * 学生信息VO
 */

export default class StudentVO {
  constructor (data) {
    data = data || {}

    this.stuId = data.stu_id || ''
    this.stuName = data.stu_name || ''
    this.stuNum = data.stu_num || ''
    this.school = data.school || ''
    this.gradeName = data.grade_name || ''
    this.parentMobile = data.parent_mobile || ''
    this.campusName = data.campus_name || ''
  }
}
