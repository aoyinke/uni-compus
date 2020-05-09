<script>
import Vue from 'vue';
import { wxLogin } from '@/utils/util.js';
import { mapMutations } from 'vuex';
export default {
	onLaunch: function(option) {
		wxLogin();
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.statusBar = e.statusBarHeight;
				console.log(e.statusBarHeight);
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
				console.log(res.data);
				// 此处仅做演示
				// 跟后台校验token的有效性，判定是否在登录状态。如果token失效，需重新登录。app端不强制用户登录，可以游客身份登录，可以进一步优化流程
				// uni.request({
				//  url: '',    // 验证token有效性的api
				//  header: {
				//     "Token":res.data.token
				//  },
				// 	method: "POST",
				// 	success: response => {
				// 		if (response.data.code === 200) {
				// 			this.storeLogin(e.data);
				// 		} else {  // 验证无效清除用户原有缓存数据
				// 			this.storeLogout()
				// 		}
				// 	}
				// })
				this.storeLogin(JSON.parse(res.data));
			}
		});

		//封装uni.request
		Vue.prototype.request = async function(route, data, method) {
			let result = await uni.request({
				url: 'https://smileapi.lililili.net/v1/' + route,
				method: method || 'GET',
				data: data
			});
			return result;
		};
	},
	onShow: function() {
		let adShowTime = 10 * 60 * 1000; // 10分钟（单位毫秒）
		let nowTime = new Date().getTime();
		let leaveTime = this.$store.state.leaveTime;
		if (nowTime - leaveTime > adShowTime) {
			console.log('出现广告吧');
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/account/ad'
				});
			}, 10);
		}
	},
	onHide: function() {
		console.log('App Hide');
		this.$store.commit('STORE_LEAVE_TIME')
	},
	methods: {
		...mapMutations(['storeLogin', 'storeLogout'])
	},
	globalData: {
		denglu: 0,
		alreadyInDetail: false
	}
};
</script>

<style lang="less">
@import './common/css/uni.css';
@import './styles/animate.less';
@import './styles/reset.less';
@import url('./common/css/iconfont.css');
</style>
