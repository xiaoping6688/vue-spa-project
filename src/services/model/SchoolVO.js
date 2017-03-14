/**
 * 服务中心VO
 */

export default class SchoolVO {
  constructor (data) {
    data = data || {}

    this.id = data.school_id || ''
    this.name = data.school_name || ''
  }
}
