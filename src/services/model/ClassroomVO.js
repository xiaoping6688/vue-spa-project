/**
 * 教室信息VO
 */

export default class ClassroomVO {
  constructor (data) {
    data = data || {}

    this.id = data.classroom_id || ''
    this.name = data.classroom_name || ''
  }
}
