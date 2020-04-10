export default function confirmLogin(provider) {
	uni.getSetting({
			success(res) {
				console.log(res.authSetting)
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
