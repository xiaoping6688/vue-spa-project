/**
 * 角色信息VO
 */

export default class RoleVO {
  constructor (data) {
    data = data || {}

    this.id = data.id || ''
    this.name = data.name || ''
  }
}
