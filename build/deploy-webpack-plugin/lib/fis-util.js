'use strict';

var Url = require('url');
var _ = {};
/**
 * 对象枚举元素遍历，若merge为true则进行_.assign(obj, callback)，若为false则回调元素的key value index
 * @param  {Object}   obj      源对象
 * @param  {Function|Object} callback 回调函数|目标对象
 * @param  {Boolean}   merge    是否为对象赋值模式
 * @memberOf fis.util
 * @name map
 * @function
 */
_.map = function(obj, callback, merge) {
  var index = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (merge) {
        callback[key] = obj[key];
      } else if (callback(key, obj[key], index++)) {
        break;
      }
    }
  }
};

_.upload = function(url, opt, data, content, subpath, callback) {
  if (typeof content === 'string') {
    content = new Buffer(content, 'utf8');
  } else if (!(content instanceof Buffer)) {
    console.error('unable to upload content [%s]', (typeof content));
  }
  opt = opt || {};
  data = data || {};
  var endl = '\r\n';
  var boundary = '-----np' + Math.random();
  var collect = [];
  _.map(data, function(key, value) {
    collect.push('--' + boundary + endl);
    collect.push('Content-Disposition: form-data; name="' + key + '"' + endl);
    collect.push(endl);
    collect.push(value + endl);
  });
  collect.push('--' + boundary + endl);
  collect.push('Content-Disposition: form-data; name="' + (opt.uploadField || "file") + '"; filename="' + subpath + '"' + endl);
  collect.push(endl);
  collect.push(content);
  collect.push(endl);
  collect.push('--' + boundary + '--' + endl);

  var length = 0;
  collect.forEach(function(ele) {
    if (typeof ele === 'string') {
      length += new Buffer(ele).length;
    } else {
      length += ele.length;
    }
  });

  opt.method = opt.method || 'POST';
  opt.headers = Object.assign({
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': length
  }, opt.headers || {});
  opt = _.parseUrl(url, opt);
  var http = opt.protocol === 'https:' ? require('https') : require('http');
  var req = http.request(opt, function(res) {
    var status = res.statusCode;
    var body = '';
    res
        .on('data', function(chunk) {
          body += chunk;
        })
        .on('end', function() {
          if (status >= 200 && status < 300 || status === 304) {
            callback(null, body);
          } else {
            callback(new Error(status + ' ' + res.statusMessage));
          }
        })
        .on('error', function(err) {
          callback(err);
        });
  });
  collect.forEach(function(d) {
    req.write(d);
  });
  req.end();
};

/**
 * url解析函数，规则类似require('url').parse
 * @param  {String} url 待解析的url
 * @param  {Object} opt 解析配置参数 { host|hostname, port, path, method, agent }
 * @return {Object}     { protocol, host, port, path, method, agent }
 * @memberOf fis.util
 * @name parseUrl
 * @function
 */
_.parseUrl = function(url, opt) {
  opt = opt || {};
  url = Url.parse(url);
  var ssl = url.protocol === 'https:';
  opt.host = opt.host || opt.hostname || ((ssl || url.protocol === 'http:') ? url.hostname : 'localhost');
  opt.port = opt.port || (url.port || (ssl ? 443 : 80));
  opt.path = opt.path || (url.pathname + (url.search ? url.search : ''));
  opt.method = opt.method || 'GET';
  opt.agent = opt.agent || false;
  return opt;
};

module.exports = _;