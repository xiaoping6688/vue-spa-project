/**
 * 校区信息VO
 */

export default class CampusVO {
  constructor (data) {
    data = data || {}

    this.id = data.campus_id || ''
    this.name = data.campus_name || ''
  }
}
