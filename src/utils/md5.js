/**
 * md5加密（with secretkey）
 */

import md5 from 'blueimp-md5'

export default value => md5(value, 'tal')
