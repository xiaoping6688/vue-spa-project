/**
 * 教室信息VO
 */

export default class ClassroomVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
