const util = require('util')
import {host,port} from './config.js'

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

export {confirmLogin,wxLogin}