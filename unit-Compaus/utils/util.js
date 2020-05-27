const util = require('util')
import {host,port} from './config.js'
import {Base64} from 'js-base64'


function _encode(token){
	const base64 = Base64.encode(token+':')
	return 'Basic ' +base64

}
function confirmLogin(provider) {
	uni.getSetting({
			success(res) {
				
				if (!res.authSetting['scope.userInfo']) {
					uni.openSetting({
						success(res) {
							 console.log(res.authSetting)
						}
					})
				}else{
					uni.getUserInfo({
						success(res) {
							let avatar = res.userInfo.avatarUrl
							let gender = res.userInfo.gender
							let nickName = res.userInfo.nickName
							let province = res.userInfo.province
							console.log(res.userInfo)
							uni.setStorageSync('SUID',avatar)
							uni.setStorageSync('SRAND',avatar)
							uni.setStorageSync('SNAME',avatar)
							uni.setStorageSync('SFACE',avatar)
							
						}
					})
				}
			}
		
	})
}

function checkLogin(url,params){
	
}
function wxLogin(){
	let url = "http://%s:%s"
	uni.login({
	  provider: 'weixin',
	  success: function (loginRes) {
	    uni.request({
	    	url:util.format(url,host,port),
			data:loginRes.code,
			method:"POST"
	    }).then(res=>{
			console.log(res)
		})
		
	  },
	  fail() {
	  	console.log("请求登录失败")
	  }
	});
}

function deepClone(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  // 根据obj的类型判断是新建一个数组还是对象
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

function debounce(fn, delay = 500) {
  // 定时器，用来 setTimeout
  let timer;
  return function(...args) {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
export {confirmLogin,wxLogin,deepClone,debounce,_encode}