<script>
	import Vue from 'vue'
	
	export default {
		onLaunch: function(option) {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight
					console.log(e.statusBarHeight)
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif

					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					console.log(custom)
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
				}
			})
			
			//封装uni.request
			Vue.prototype.request = async function(route,data,method) {
				let result = await uni.request({
					url:"https://smileapi.lililili.net/v1/" + route,
					method:method || 'GET',
					data:data
				})
				return result
			};
		},
		onShow: function() {
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			
		},
		globalData: {  
            denglu: 0,
			alreadyInDetail:false
        }
		

	}
</script>

<style>
	@import './common/css/uni.css';
	@import url("./common/css/iconfont.css");
</style>
