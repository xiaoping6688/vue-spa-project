/**
 * 课程信息VO
 */

export default class CourseVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
    this.desc = data.desc || ''
  }
}
