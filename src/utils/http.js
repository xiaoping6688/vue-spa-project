/**
 * HTTP数据通信模块
 */

import 'whatwg-fetch'
import qs from 'querystring'

// 缺省请求头
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' // application/x-www-form-urlencoded
}

// 请求参数加工
function mutate (url, { headers, body, query, ...options }) {
  headers = { ...defaultHeaders, ...headers }
  options.headers = headers

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }

  options.credentials = 'omit' // omit,same-origin,include
  options.mode = 'same-origin' // "same-origin", "cors", "no-cors", "navigate", or "websocket"

  return [url, options]
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

/**
 * 接口调用服务
 * @param {String} url 接口API（必填）
 * @param {Object} options 请求参数（选填）{headers, body, query, ...options}
 * @return {Object} Promise
 * @throws {Error}
 */
const callService = (url, options = {}) => {
  return window.fetch(...mutate(url, options))
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.log(error)
      throw error
    })
}

export default callService

export const get = (url, args, options = {}) => {
  options.method = 'GET'
  options.query = args
  return callService(url, options)
}

export const post = (url, args, options = {}) => {
  options.method = 'POST'
  options.body = args
  return callService(url, options)
}

export const put = (url, args, options = {}) => {
  options.method = 'PUT'
  options.body = args
  return callService(url, options)
}

export const patch = (url, args, options = {}) => {
  options.method = 'PATCH'
  options.body = args
  return callService(url, options)
}

export const del = (url, args, options = {}) => {
  options.method = 'DELETE'
  options.query = args
  return callService(url, options)
}
