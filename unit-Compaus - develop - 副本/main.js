import Vue from 'vue'
import App from './App'
import store from './store'



import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
import TabMask from '@/components/chunLei-modal/tabMask'
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'

import lvSelect from '@/components/lv-select/lv-select.vue';

Vue.config.productionTip = false
Vue.component('uniNavBar', uniNavBar);
Vue.component('chunLei-modal',chunLeiModal);
Vue.component('uniCompusButton',uniCompusButton);

Vue.component('lv-select',lvSelect)

//把vuex定义成全局组件
Vue.prototype.$store = store


// Array.prototype.find = function (element,dataStore){
//     for( var i = 0 ; i < this.dataStore.length ; i ++ ){
//             if( this.dataStore[i] == element ){
//                 return i;
//             }
//         }
//     return -1;
// }

Vue.prototype.checkLogin = function(backpage, backtype) {
	var SUID = uni.getStorageSync('SUID'); //本地持久化存储
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SAVATAR = uni.getStorageSync('SFACE');
	if (SUID == '' || SRAND == '' || SAVATAR == '') {
		//#ifndef MP-WEIXIN
		uni.redirectTo({
			url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
		});
		return false;
		// #endif

		
		return false;
	}
	return [SUID, SRAND, SNAME, SAVATAR]; //已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]，以供后续使用用户信息
}

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
