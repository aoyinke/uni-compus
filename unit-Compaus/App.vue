<script>
import Vue from 'vue';
import { _encode } from '@/utils/util.js';
import { mapMutations, mapState } from 'vuex';
import store from '@/store/index.js'

const util = require('util');



export default {
	onLaunch: function(option) {

		let host = 'https://www.unicompus.com';
		// let host = 'https://114.55.251.105';
		let port = '3000';
		
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.statusBar = e.statusBarHeight;

				// #ifndef MP
				if (e.platform == 'android') {
					Vue.prototype.customBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.customBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				let custom = wx.getMenuButtonBoundingClientRect();
				console.log(custom);
				Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});

		//检验是否登录
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				let result = JSON.parse(res.data);

				// 此处仅做演示
				// 跟后台校验token的有效性，判定是否在登录状态。如果token失效，需重新登录。app端不强制用户登录，可以游客身份登录，可以进一步优化流程
				uni.request({
					url: util.format('%s:%s/v1/user/verify', host, port), // 验证token有效性的api
					data:{
						token:result.token
					},
					method: 'POST',
					success: response => {
						console.log( response);
						if (response.data.is_valid) {
							this.storeLogin({hasLogin:true,token:result.token,uid:result.uid});
						} else {  // 验证无效清除用户原有缓存数据
							this.storeLogout()
						}
					},
					fail: err => {
						console.log(err);
					}
				});
				// this.storeLogin(JSON.parse(res.data));
			}
		});

		//封装uni.request
		Vue.prototype.request = function(route, data, method) {

			
			let token = JSON.parse(uni.getStorageSync('userInfo')).token
			let basic_token = _encode(token)
			let config = {
				url: 'https://www.unicompus.com:3000/' + route,
				
				method: method || 'GET',
				data: data,
				header:{
					Authorization:basic_token
				},
			}
			return new Promise((resolve,reject)=>{
				uni.request(config).then(res=>{
					resolve(res)
				}).catch(err=>{
					reject(err)
				})
			})
			
		};
		Vue.prototype.uploadFile = function(route,file,formData){
			let token = JSON.parse(uni.getStorageSync('userInfo')).token
			let basic_token = _encode(token)
			let result = uni.uploadFile({
				url:"https://www.unicompus.com:3000/" + route,
				
				filePath:file,
				name:"file",
				formData:formData,
				header:{
					Authorization:basic_token
				}
			})
			return result
		}
		
		this.request('v1/group/getUserAuth').then(res=>{
			console.log("userAuth",res)
			this.changeGroupAuth(res[1].data)
		})



	},
	onShow: function() {

		let adShowTime = 10 * 60 * 1000; // 10分钟（单位毫秒）
		let nowTime = new Date().getTime();
		let leaveTime = this.$store.state.leaveTime;
		if (nowTime - leaveTime > adShowTime) {

			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/account/ad'
				});
			}, 10);
		}

	},
	onHide: function() {
		console.log('App Hide');
		this.$store.commit('STORE_LEAVE_TIME');
	},
	methods: {
		...mapMutations(['storeLogin', 'storeLogout','changeGroupAuth']),


	},
	globalData: {
		denglu: 0,
		alreadyInDetail: false
	},
	computed: {}
};
</script>

<style lang="less">
@import './common/css/uni.css';
@import './styles/animate.less';
@import './styles/reset.less';
@import url('./common/css/iconfont.css');
</style>
