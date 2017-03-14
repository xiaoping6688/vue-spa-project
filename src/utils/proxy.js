/**
 * 对http请求参数代理
 */
export function argumentsProxy (vo) {
  if (vo) {
    if (typeof vo.revert === 'function') {
      return vo.revert()
    } else {
      return vo
    }
  } else {
    return null
  }
}

/**
 * 对http结果代理
 */
export function httpResultProxy (resultPromise, VO = null) {
  return new Promise((resolve, reject) => {
    resultPromise.then(res => {
      if (res) {
        if (res.rlt === 'true') {
          resolve(mapVO(VO, res.data))
        } else {
          reject(new Error(res.msg))
        }
      } else {
        reject(new Error('服务器返回数据异常'))
      }
    }, (error) => {
      throw error
    }).catch(error => {
      if (error.response) {
        // throw new Error('服务器异常！')
        reject(new Error('服务器异常！'))
      } else {
        // throw new Error('系统异常！')
        reject(new Error('服务器异常！'))
      }
    })
  })
}

function mapVO (VO, data) {
  if (VO) {
    if (Array.isArray(data)) {
      let arr = []
      for (let item of data) {
        arr.push(new VO(item))
      }
      return arr
    } else {
      return new VO(data)
    }
  } else {
    return data
  }
}
