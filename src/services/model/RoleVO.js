/**
 * 角色信息VO
 */

export default class RoleVO {
  constructor (data) {
    data = data || {}

    this.id = data.role_id || ''
    this.name = data.role_name || ''
  }
}
