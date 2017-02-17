/**
 * 校区信息VO
 */

export default class CampusVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
