/**
 * 教师信息VO
 */

export default class TeacherVO {
  constructor (data) {
    data = data || {}

    this.teacherId = data.teacher_id || ''
    this.teacherName = data.teacher_name || ''
    this.mobile = data.mobile || ''
    this.roleName = data.role_name || ''
    this.subjectName = data.subject_name || ''
    this.campusName = data.campus_name || ''
  }
}
