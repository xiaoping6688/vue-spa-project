/**
 * 班型信息VO
 */

export default class ClassTypeVO {
  constructor (data) {
    data = data || {}

    this.classTypeId = data.class_type_id || ''
    this.classTypeName = data.class_type_name || ''
    this.courseName = data.course_name || ''
    this.subjectName = data.subject_name || ''
  }
}
