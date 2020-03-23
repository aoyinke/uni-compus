import Vue from 'vue'
import App from './App'

import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'

Vue.config.productionTip = false
Vue.component('uniNavBar',uniNavBar)
// Vue.prototype.checkLogin = function(backpage,backtype){
// 	var SUID = uni.getStorageSync('SUID');
// 	var SRAND = uni.getStorageSync('SRAND')
// 	var SNAME = uni.getStorageSync('SNAME')
// 	var SFACE = uni.getStorageSync('SFACE')
// 	if(SUID == '' || SRAND=='' SNAME == '' || SFACE == ''){
// 		uni.redirectTo({
// 			url:"../login/login?backpage="+backpage+"&backtype"+backtype
// 		})
// 		return false
// 	}
// 	reutrn [SUID,SRAND,SNAME,SFACE]
// }
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
