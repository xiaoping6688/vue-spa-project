/**
 * 工具类、实用函数
 * @see lodash
 */

/**
 * 找出第一个符合条件的数组成员
 */
export function findItem (arr, key, value) {
  return arr.find(item => item[key] === value)
}

export function findNameById (arr, id) {
  let item = findItem(arr, 'id', id)
  return item ? item.name : ''
}
