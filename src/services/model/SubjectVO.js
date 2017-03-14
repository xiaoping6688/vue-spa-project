/**
 * 学科信息VO
 */

export default class SubjectVO {
  constructor (data) {
    data = data || {}

    this.id = data.subject_id || ''
    this.name = data.subject_name || ''
  }
}
