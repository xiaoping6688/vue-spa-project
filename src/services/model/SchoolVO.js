/**
 * 服务中心VO
 */

export default class SchoolVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
