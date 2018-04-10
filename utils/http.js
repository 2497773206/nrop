const request = require('request')
const base = require('./base')
module.exports = {
  header(url, opts){
    opts = opts || {}
    opts.url = url
    return new Promise(function (resolve, reject) {
      request(opts, function(error, response, body){
          resolve(response)
        })
    })
  },


	get(url , opts ){
    opts = opts || {}
		let headers = {
		    'Accept-Language':'zh-CN,zh;q=0.8',
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
		}

    if(opts.fake){
      delete opts.fake
      let rndip = base.ip()
      headers['PHPSESSID'] = 'fsef'
      headers['CLIENT-IP'] = rndip
      headers['HTTP_X_FORWARDED_FOR'] = rndip
    }
    opts.headers = headers
    opts.url = url
    
		return new Promise(function (resolve, reject) {
			request(opts, function(error, response, body){
		      if (!error && response.statusCode == 200) {
		        resolve(body)
		      }else{
	            reject(error || response.statusCode);
		      }
		    })
		})
	},

	post(url , form , fake){
		let headers = {
		    'Accept-Language':'zh-CN,zh;q=0.8',
		}
    if(fake){
      let rndip = base.ip()
      headers['PHPSESSID'] = 'fsef'
      headers['CLIENT-IP'] = rndip
      headers['HTTP_X_FORWARDED_FOR'] = rndip
    }
		return new Promise(function (resolve, reject) {
			request({url , form , headers} , function(error, response, body){
		      if (!error && response.statusCode == 200) {
		        resolve(body)
		      }else{
	            reject(error || response.statusCode);
		      }
		    })
		})
	}
}


