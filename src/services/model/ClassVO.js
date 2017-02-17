/**
 * 班级信息VO
 */

export default class ClassVO {
  constructor (data) {
    data = data || {}

    this.classId = data.class_id || ''
    this.className = data.class_name || ''
    this.chargeStandard = data.charge_standard || ''
    this.masterTchName = data.master_tch_name || ''
    this.startDate = data.start_date || ''
    this.stuNum = data.stu_num || ''
    this.totalNum = data.total_num || ''
  }
}
