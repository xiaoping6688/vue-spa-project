/**
 * 学科信息VO
 */

export default class SubjectVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
