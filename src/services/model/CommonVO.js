/**
 * 通用信息VO
 */

export default class CommonVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
